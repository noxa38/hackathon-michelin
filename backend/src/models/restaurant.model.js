import pool from '../config/db.js'

export async function getAllRestaurants() {
  const [rows] = await pool.execute(
    `SELECT id, name, address, location, city, price, cuisine, longitude, latitude,
            phone_number, michelin_url, website_url, award, stars, green_star,
            facilities, description
     FROM restaurants
     ORDER BY stars DESC, name ASC`
  )
  return rows
}

export async function searchRestaurants(query, city) {
  const like = `%${query}%`
  const [rows] = await pool.execute(
    `SELECT id, name, address, location, city, price, cuisine,
            michelin_url, award, stars, green_star
     FROM restaurants
     WHERE (name LIKE ? OR city LIKE ?)
       AND (? = '' OR city = ?)
     LIMIT 20`,
    [like, like, city, city]
  )
  return rows
}

export async function getRestaurantById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM restaurants WHERE id = ?',
    [id]
  )
  return rows[0] ?? null
}

export async function getNearbyRestaurants(latitude, longitude, radiusKm = 20, limit = 12) {
  const [rows] = await pool.execute(
    `SELECT id,
            name,
            city,
            latitude,
            longitude,
            (6371 * ACOS(
              COS(RADIANS(?)) * COS(RADIANS(latitude)) *
              COS(RADIANS(longitude) - RADIANS(?)) +
              SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )) AS distance_km
     FROM restaurants
     WHERE latitude IS NOT NULL
       AND longitude IS NOT NULL
     HAVING distance_km <= ?
     ORDER BY distance_km ASC
     LIMIT ?`,
    [latitude, longitude, latitude, radiusKm, limit]
  )
  return rows
}
