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