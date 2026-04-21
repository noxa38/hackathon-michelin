-- schema.sql — Table des restaurants Guide Michelin

DROP TABLE IF EXISTS accommodations;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255)  NOT NULL,
  address      VARCHAR(500),
  location     VARCHAR(255),
  city         VARCHAR(100),
  price        VARCHAR(20),
  cuisine      VARCHAR(255),
  longitude    DECIMAL(10, 7),
  latitude     DECIMAL(10, 7),
  phone_number VARCHAR(50),
  michelin_url VARCHAR(500),
  website_url  VARCHAR(500),
  award        VARCHAR(100),
  stars        TINYINT      DEFAULT 0,
  green_star   TINYINT(1)   DEFAULT 0,
  facilities   TEXT,
  description  TEXT,
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE accommodations (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  city       VARCHAR(100),
  category   VARCHAR(100),
  address    VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
