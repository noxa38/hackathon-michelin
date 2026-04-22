-- Migration : ajout de la table restaurant_photos
-- À exécuter UNE SEULE FOIS sur une base existante déjà peuplée

CREATE TABLE IF NOT EXISTS restaurant_photos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT          NOT NULL,
  url           VARCHAR(500) NOT NULL,
  caption       VARCHAR(255),
  position      TINYINT      DEFAULT 0,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_restaurant_photo FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
