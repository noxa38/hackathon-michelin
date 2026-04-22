import pool from '../config/db.js'

export async function addFavorite(userId, restaurantId) {
  const [result] = await pool.execute(
    'INSERT INTO favorites (user_id, restaurant_id) VALUES (?, ?)',
    [userId, restaurantId]
  )
  return result
}

export async function removeFavorite(userId, restaurantId) {
  const [result] = await pool.execute(
    'DELETE FROM favorites WHERE user_id = ? AND restaurant_id = ?',
    [userId, restaurantId]
  )
  return result
}

export async function isFavorite(userId, restaurantId) {
  const [rows] = await pool.execute(
    'SELECT id FROM favorites WHERE user_id = ? AND restaurant_id = ?',
    [userId, restaurantId]
  )
  return rows.length > 0
}

export async function getUserFavorites(userId) {
  const [rows] = await pool.execute(
    'SELECT r.* FROM restaurants r INNER JOIN favorites f ON r.id = f.restaurant_id WHERE f.user_id = ? ORDER BY f.created_at DESC',
    [userId]
  )
  return rows
}

export async function getFavoriteCount(userId) {
  const [rows] = await pool.execute(
    'SELECT COUNT(*) as count FROM favorites WHERE user_id = ?',
    [userId]
  )
  return rows[0].count
}

export async function getUserFavoritesWithIds(userId) {
  const [rows] = await pool.execute(
    'SELECT restaurant_id FROM favorites WHERE user_id = ?',
    [userId]
  )
  return rows.map(row => row.restaurant_id)
}

// Accommodation favorites functions
export async function addAccommodationFavorite(userId, accommodationId) {
  const [result] = await pool.execute(
    'INSERT INTO accommodation_favorites (user_id, accommodation_id) VALUES (?, ?)',
    [userId, accommodationId]
  )
  return result
}

export async function removeAccommodationFavorite(userId, accommodationId) {
  const [result] = await pool.execute(
    'DELETE FROM accommodation_favorites WHERE user_id = ? AND accommodation_id = ?',
    [userId, accommodationId]
  )
  return result
}

export async function isAccommodationFavorite(userId, accommodationId) {
  const [rows] = await pool.execute(
    'SELECT id FROM accommodation_favorites WHERE user_id = ? AND accommodation_id = ?',
    [userId, accommodationId]
  )
  return rows.length > 0
}

export async function getUserAccommodationFavorites(userId) {
  const [rows] = await pool.execute(
    'SELECT a.* FROM accommodations a INNER JOIN accommodation_favorites af ON a.id = af.accommodation_id WHERE af.user_id = ? ORDER BY af.created_at DESC',
    [userId]
  )
  return rows
}

export async function getAccommodationFavoriteCount(userId) {
  const [rows] = await pool.execute(
    'SELECT COUNT(*) as count FROM accommodation_favorites WHERE user_id = ?',
    [userId]
  )
  return rows[0].count
}

export async function getUserAccommodationFavoritesWithIds(userId) {
  const [rows] = await pool.execute(
    'SELECT accommodation_id FROM accommodation_favorites WHERE user_id = ?',
    [userId]
  )
  return rows.map(row => row.accommodation_id)
}
