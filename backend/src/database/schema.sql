-- schema.sql — Consolidated schema for Michelin Guide application
-- Tables: users, restaurants, accommodations, professional management, and utilities

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

-- ============================================================
-- Drop existing tables (reverse order of foreign keys)
-- ============================================================

DROP TABLE IF EXISTS professional_restaurants;
DROP TABLE IF EXISTS professional_requests;
DROP TABLE IF EXISTS list_restaurants;
DROP TABLE IF EXISTS list_accommodations;
DROP TABLE IF EXISTS restaurant_photos;
DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS accommodation_favorites;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS accommodations;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS users;

-- ============================================================
-- USERS table
-- ============================================================

CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(255) NOT NULL UNIQUE,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name  VARCHAR(100),
  user_type  ENUM('individual', 'professional', 'admin') DEFAULT 'individual',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- FRIENDSHIPS table
-- ============================================================

CREATE TABLE friendships (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  friend_id  INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_friendships_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_friendships_friend FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_friendship (user_id, friend_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- LISTS table (user collections)
-- ============================================================

CREATE TABLE lists (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- RESTAURANTS table
-- ============================================================

CREATE TABLE restaurants (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255)  NOT NULL,
  address       VARCHAR(500),
  location      VARCHAR(255),
  city          VARCHAR(100),
  country       VARCHAR(100),
  price         VARCHAR(20),
  cuisine       VARCHAR(255),
  longitude     DECIMAL(10, 7),
  latitude      DECIMAL(10, 7),
  phone_number  VARCHAR(50),
  michelin_url  VARCHAR(500),
  website_url   VARCHAR(500),
  award         VARCHAR(100),
  stars         TINYINT       DEFAULT 0,
  green_star    TINYINT(1)    DEFAULT 0,
  facilities    TEXT,
  description   TEXT,
  opening_hours VARCHAR(255)  DEFAULT NULL,
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- RESTAURANT_PHOTOS table
-- ============================================================

CREATE TABLE restaurant_photos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT          NOT NULL,
  url           VARCHAR(500) NOT NULL,
  caption       VARCHAR(255),
  position      TINYINT      DEFAULT 0,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_restaurant_photo FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- LIST_RESTAURANTS table (many-to-many)
-- ============================================================

CREATE TABLE list_restaurants (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  list_id       INT NOT NULL,
  restaurant_id INT NOT NULL,
  added_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_list_restaurants_list FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
  CONSTRAINT fk_list_restaurants_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  UNIQUE KEY unique_list_restaurant (list_id, restaurant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- LIST_ACCOMMODATIONS table (many-to-many)
-- ============================================================

CREATE TABLE list_accommodations (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  list_id          INT NOT NULL,
  accommodation_id INT NOT NULL,
  accommodation_source VARCHAR(30) NOT NULL DEFAULT 'hotels',
  added_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_list_accommodations_list FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
  UNIQUE KEY unique_list_accommodation (list_id, accommodation_source, accommodation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- PROFESSIONAL_REQUESTS table
-- ============================================================

CREATE TABLE professional_requests (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  user_id            INT NOT NULL,
  restaurant_id      INT NOT NULL,
  proof_document_url VARCHAR(500),
  status             ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  rejection_reason   TEXT,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_professional_requests_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_professional_requests_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_restaurant (user_id, restaurant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- PROFESSIONAL_RESTAURANTS table
-- ============================================================

CREATE TABLE professional_restaurants (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  restaurant_id INT NOT NULL,
  hours         JSON,
  menu          JSON,
  description   TEXT,
  prices        JSON,
  photos        JSON,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_professional_restaurants_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_professional_restaurants_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  UNIQUE KEY unique_professional_restaurant (user_id, restaurant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- ACCOMMODATIONS table (alternative name for hotels)
-- ============================================================

CREATE TABLE accommodations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  address     VARCHAR(500),
  city        VARCHAR(100),
  country     VARCHAR(100),
  latitude    DECIMAL(10, 7),
  longitude   DECIMAL(10, 7),
  stars       TINYINT      DEFAULT 3,
  phone       VARCHAR(50),
  description TEXT,
  facilities  TEXT,
  price_from  INT,
  photo_url   VARCHAR(500),
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- HOTELS table
-- ============================================================

CREATE TABLE hotels (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  address     VARCHAR(500),
  city        VARCHAR(100),
  country     VARCHAR(100),
  latitude    DECIMAL(10, 7),
  longitude   DECIMAL(10, 7),
  stars       TINYINT      DEFAULT 3,
  phone       VARCHAR(50),
  description TEXT,
  facilities  TEXT,
  price_from  INT,
  photo_url   VARCHAR(500),
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- HOTEL_ROOMS table
-- ============================================================

CREATE TABLE hotel_rooms (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id        INT NOT NULL,
  room_type       VARCHAR(100) NOT NULL,
  description     TEXT,
  price_per_night INT,
  capacity        TINYINT,
  amenities       TEXT,
  photo_url       VARCHAR(500),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_hotel_rooms_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- FAVORITES table (user liked restaurants)
-- ============================================================

CREATE TABLE favorites (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  restaurant_id INT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_favorites_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_restaurant_favorite (user_id, restaurant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- ACCOMMODATION_FAVORITES table (user liked accommodations)
-- ============================================================

CREATE TABLE accommodation_favorites (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL,
  accommodation_id INT NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_accommodation_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_accommodation_favorites_accommodation FOREIGN KEY (accommodation_id) REFERENCES accommodations(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_accommodation_favorite (user_id, accommodation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
