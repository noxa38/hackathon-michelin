-- Migration : ajout de la colonne opening_hours à la table restaurants
ALTER TABLE restaurants
  ADD COLUMN opening_hours VARCHAR(255) DEFAULT NULL
  AFTER description;
