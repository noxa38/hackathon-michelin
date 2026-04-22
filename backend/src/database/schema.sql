-- schema.sql — Tables du Guide Michelin

DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS accommodations;
DROP TABLE IF EXISTS list_restaurants;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(255) NOT NULL UNIQUE,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name  VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lists (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  user_id   INT NOT NULL,
  name      VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE list_restaurants (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  list_id       INT NOT NULL,
  restaurant_id INT NOT NULL,
  added_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_list_restaurants_list FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
  CONSTRAINT fk_list_restaurants_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  UNIQUE KEY unique_list_restaurant (list_id, restaurant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE accommodations (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  city       VARCHAR(100),
  category   VARCHAR(100),
  address    VARCHAR(500),
  photo_url  VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hotels (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  address      VARCHAR(500),
  city         VARCHAR(100),
  country      VARCHAR(100),
  latitude     DECIMAL(10, 7),
  longitude    DECIMAL(10, 7),
  stars        TINYINT DEFAULT 0,
  rating_stars DECIMAL(2,1),
  phone        VARCHAR(50),
  description  TEXT,
  facilities   TEXT,
  price_from   INT,
  image_url    VARCHAR(500),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hotel_rooms (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id   INT NOT NULL,
  room_type  VARCHAR(100) NOT NULL,
  description TEXT,
  price_per_night INT,
  capacity   TINYINT,
  amenities  TEXT,
  photo_url  VARCHAR(500),
  CONSTRAINT fk_hotel_rooms_hotel
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
