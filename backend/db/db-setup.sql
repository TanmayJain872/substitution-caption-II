CREATE DATABASE IF NOT EXISTS captions_db;

USE captions_db;

CREATE TABLE IF NOT EXISTS players (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    playerNumber INT UNSIGNED UNIQUE,
    name VARCHAR(255),
    createdBy INT UNSIGNED DEFAULT 1,
    updatedBy INT UNSIGNED DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS captions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    playerOut VARCHAR(255),
    numberOut INT UNSIGNED,
    playerIn VARCHAR(255),
    numberIn INT UNSIGNED,
    time VARCHAR(15),
    createdBy INT UNSIGNED DEFAULT 1,
    updatedBy INT UNSIGNED DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);