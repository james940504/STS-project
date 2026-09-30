import os

from dotenv import load_dotenv
from google import genai


# 讀取同一層的 .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY", "").strip()

print("========== Gemini API 小測試 ==========")
print("API Key 是否讀到：", bool(api_key))
print("API Key 長度：", len(api_key))
print("API Key 開頭：", api_key[:3])

try:
    print("\n開始建立 Gemini Client...")

    client = genai.Client(
        api_key=api_key
    )

    print("Client 建立完成")
    print("開始呼叫 Gemini...")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="請只回答 OK"
    )

    print("\n========== 成功 ==========")
    print("Gemini 回覆：")
    print(response.text)

except Exception as exc:
    print("\n========== 失敗 ==========")
    print("錯誤類型：", type(exc).__name__)
    print("錯誤內容：")
    print(exc)