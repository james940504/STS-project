-- 在 MySQL Workbench 開一個新的 SQL 分頁，貼上這整段執行即可

CREATE DATABASE IF NOT EXISTS sts_game CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sts_game;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  coins INT NOT NULL DEFAULT 0,
  starter_given BOOLEAN NOT NULL DEFAULT FALSE,
  save_data JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 如果你的 users 表已經是舊版建立的（沒有 save_data 欄位），改執行這行來補上：
-- ALTER TABLE users ADD COLUMN save_data JSON NULL;

-- 個人訓練歷史（server.py 第一次用到時也會自動建立，這裡留一份方便手動建立）
CREATE TABLE IF NOT EXISTS training_sessions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  client_id VARCHAR(40) NOT NULL,
  played_at_ms BIGINT NOT NULL,
  mode VARCHAR(32) NULL,
  difficulty VARCHAR(16) NULL,
  result VARCHAR(16) NULL,
  score INT NULL,
  reps INT NULL,
  seconds FLOAT NULL,
  posture_total SMALLINT NULL,
  trunk_score SMALLINT NULL,
  heel_score SMALLINT NULL,
  knee_score SMALLINT NULL,
  metrics_json JSON NULL,
  record_session_id VARCHAR(64) NULL,
  heavy_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_client (user_id, client_id),
  KEY idx_user_played (user_id, played_at_ms)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
