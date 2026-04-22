-- schema_hotels.sql

DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS hotels;

CREATE TABLE hotels (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255)   NOT NULL,
  address      VARCHAR(500),
  city         VARCHAR(100),
  country      VARCHAR(100),
  latitude     DECIMAL(10, 6),
  longitude    DECIMAL(10, 6),
  stars        TINYINT        DEFAULT 3,
  phone        VARCHAR(50),
  description  TEXT,
  facilities   TEXT,
  price_from   INT,
  photo_url    VARCHAR(500),
  created_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hotel_rooms (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id         INT            NOT NULL,
  room_type        VARCHAR(100)   NOT NULL,
  description      TEXT,
  price_per_night  INT,
  capacity         TINYINT,
  amenities        TEXT,
  photo_url        VARCHAR(500),
  CONSTRAINT fk_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
