"""忘記密碼：寄送重設連結 + 用連結設定新密碼（Flask Blueprint）

.env 需要設定（以 Gmail 為例，密碼請用「應用程式密碼」，不是登入密碼）：
    SMTP_USER=你的寄信帳號@gmail.com
    SMTP_PASSWORD=16碼應用程式密碼
    STS_PUBLIC_URL=http://實驗室電腦IP:5050     # 信裡連結的網址；組員要從外網連時換成對外網址
可選：SMTP_HOST（預設 smtp.gmail.com）、SMTP_PORT（預設 587）、SMTP_FROM

沒設定 SMTP 時，重設連結會直接印在 server.py 的終端機，方便本機測試。
"""
import hashlib
import os
import secrets
import smtplib
import time
from collections import defaultdict, deque
from email.message import EmailMessage

from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

pw_bp = Blueprint("password_reset", __name__)
_get_db = None
_table_ready = False
TOKEN_MINUTES = 30
_hits = defaultdict(deque)

DDL = """
CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_token (token_hash),
  KEY idx_user (user_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
"""


def register_password_reset(app, get_db):
    global _get_db
    _get_db = get_db
    app.register_blueprint(pw_bp)


def _ensure_table(cur):
    global _table_ready
    if not _table_ready:
        cur.execute(DDL)
        _table_ready = True


def _limited(key: str, limit: int = 5) -> bool:
    now = time.time()
    q = _hits[key]
    while q and now - q[0] > 600:
        q.popleft()
    if len(q) >= limit:
        return True
    q.append(now)
    return False


def _hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def _brevo_send(to: str, subject: str, text: str) -> None:
    """用 Brevo 的 HTTPS API 寄信（不走 SMTP，不需要 Gmail 應用程式密碼，網路擋 SMTP 埠也能用）。"""
    import requests
    sender = os.environ.get("MAIL_FROM", "").strip() or os.environ.get("SMTP_USER", "").strip()
    r = requests.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={"api-key": os.environ["BREVO_API_KEY"].strip(), "content-type": "application/json"},
        json={"sender": {"email": sender, "name": "STS"}, "to": [{"email": to}],
              "subject": subject, "textContent": text},
        timeout=15,
    )
    if not r.ok:
        raise RuntimeError(f"Brevo HTTP {r.status_code}: {r.text[:300]}")


def send_mail(to: str, subject: str, text: str) -> None:
    """有設 BREVO_API_KEY 就用 Brevo，否則用 SMTP。失敗會丟例外。"""
    if os.environ.get("BREVO_API_KEY", "").strip():
        _brevo_send(to, subject, text)
        return
    user = os.environ.get("SMTP_USER", "").strip()
    password = os.environ.get("SMTP_PASSWORD", "").replace(" ", "").strip()
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = os.environ.get("SMTP_FROM", user)
    msg["To"] = to
    msg.set_content(text)
    host, port = os.environ.get("SMTP_HOST", "smtp.gmail.com"), int(os.environ.get("SMTP_PORT", "587"))
    with smtplib.SMTP(host, port, timeout=15) as s:
        s.starttls()
        s.login(user, password)
        s.send_message(msg)


def _send_mail(to: str, link: str) -> None:
    user = os.environ.get("SMTP_USER", "").strip()
    password = os.environ.get("SMTP_PASSWORD", "").replace(" ", "").strip()
    if not os.environ.get("BREVO_API_KEY", "").strip() and (not user or not password):
        print(f"[忘記密碼] 尚未設定寄信（BREVO_API_KEY 或 SMTP_USER/SMTP_PASSWORD），未寄信。重設連結（{TOKEN_MINUTES} 分鐘內有效）：\n  {link}", flush=True)
        return
    text = (f"你好，\n\n請點下方連結重設 STS 的密碼（{TOKEN_MINUTES} 分鐘內有效，只能使用一次）：\n{link}\n\n"
            "如果不是你本人操作，請忽略這封信，你的密碼不會改變。")
    try:
        send_mail(to, "STS 密碼重設", text)
        print(f"[忘記密碼] 已寄出重設信給 {to}", flush=True)
    except Exception as e:
        print(f"[忘記密碼] 寄信失敗：{type(e).__name__}: {e}\n  連結（備用）：{link}", flush=True)


@pw_bp.post("/api/forgot-password")
def forgot_password():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    generic = {"success": True, "message": "如果此信箱已註冊，重設連結已寄出，請到信箱查看（也請檢查垃圾郵件）。"}
    if not email:
        return jsonify({"success": False, "message": "請輸入電子郵件"}), 400
    if _limited(f"{request.remote_addr}|{email}"):
        return jsonify({"success": False, "message": "請求太頻繁，請稍後再試"}), 429

    conn = _get_db()
    try:
        with conn.cursor() as cur:
            _ensure_table(cur)
            cur.execute("SELECT id FROM users WHERE email=%s", (email,))
            user = cur.fetchone()
            if not user:
                return jsonify(generic)  # 不透露信箱是否存在
            token = secrets.token_urlsafe(32)
            cur.execute("UPDATE password_resets SET used=1 WHERE user_id=%s AND used=0", (user["id"],))
            cur.execute(
                "INSERT INTO password_resets (user_id, token_hash, expires_at) "
                "VALUES (%s, %s, DATE_ADD(UTC_TIMESTAMP(), INTERVAL %s MINUTE))",
                (user["id"], _hash(token), TOKEN_MINUTES),
            )
            conn.commit()
    finally:
        conn.close()

    base = os.environ.get("STS_PUBLIC_URL", "").strip().rstrip("/") or request.host_url.rstrip("/")
    _send_mail(email, f"{base}/STS_Home.html?reset={token}")
    return jsonify(generic)


@pw_bp.post("/api/reset-password")
def reset_password():
    data = request.get_json(silent=True) or {}
    token = (data.get("token") or "").strip()
    password = data.get("password") or ""
    if not token:
        return jsonify({"success": False, "message": "連結無效"}), 400
    if len(password) < 6:
        return jsonify({"success": False, "message": "密碼至少需要 6 個字元"}), 400

    conn = _get_db()
    try:
        with conn.cursor() as cur:
            _ensure_table(cur)
            cur.execute(
                "SELECT id, user_id FROM password_resets "
                "WHERE token_hash=%s AND used=0 AND expires_at > UTC_TIMESTAMP()",
                (_hash(token),),
            )
            row = cur.fetchone()
            if not row:
                return jsonify({"success": False, "message": "連結已失效或已使用，請重新申請"}), 400
            cur.execute("UPDATE users SET password_hash=%s WHERE id=%s",
                        (generate_password_hash(password), row["user_id"]))
            cur.execute("UPDATE password_resets SET used=1 WHERE user_id=%s", (row["user_id"],))
            conn.commit()
    finally:
        conn.close()
    return jsonify({"success": True, "message": "密碼已更新，請用新密碼登入"})
