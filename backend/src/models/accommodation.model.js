import pool from '../config/db.js'

export async function searchAccommodations(query, city) {
  const like = `%${query}%`
  const [rows] = await pool.execute(
    `SELECT id, name, city, category, address
     FROM accommodations
     WHERE (name LIKE ? OR city LIKE ?)
       AND (? = '' OR city = ?)
     LIMIT 20`,
    [like, like, city, city]
  )
  return rows
}

export async function getAccommodationById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM accommodations WHERE id = ?',
    [id]
  )
  return rows[0] ?? null
}
