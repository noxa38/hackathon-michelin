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
