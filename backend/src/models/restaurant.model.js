import pool from '../config/db.js'

export async function searchRestaurants(query, city) {
  const like = `%${query}%`
  const [rows] = await pool.execute(
    `SELECT id, name, city, stars, cuisine, address
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
