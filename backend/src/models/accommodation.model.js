import pool from '../config/db.js'

export async function searchAccommodations(query, city) {
  const like = `%${query}%`
  const [rows] = await pool.execute(
    `SELECT id,
            name,
            city,
            CASE
              WHEN stars >= 4 THEN 'Hôtel de luxe'
              WHEN stars = 3 THEN 'Hôtel haut de gamme'
              ELSE 'Hôtel'
            END AS category,
            address
     FROM hotels
     WHERE (name LIKE ? OR city LIKE ? OR address LIKE ?)
       AND (? = '' OR city = ?)
     LIMIT 50`,
    [like, like, like, city, city]
  )
  return rows
}

export async function getAccommodationById(id) {
  const [rows] = await pool.execute(
    `SELECT id,
            name,
            city,
            CASE
              WHEN stars >= 4 THEN 'Hôtel de luxe'
              WHEN stars = 3 THEN 'Hôtel haut de gamme'
              ELSE 'Hôtel'
            END AS category,
            address,
            country,
            stars,
            phone,
            description,
            facilities,
            price_from
     FROM hotels
     WHERE id = ?`,
    [id]
  )
  return rows[0] ?? null
}
