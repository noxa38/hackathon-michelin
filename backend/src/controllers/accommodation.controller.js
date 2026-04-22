import db from "../config/db.js";

export async function getAccommodations(req, res) {
  try {
    const { q, city } = req.query;

    let query = `
      SELECT id, name, address, city, country, latitude, longitude, 
             stars, phone, description, facilities, price_from as price, photo_url
      FROM hotels
      WHERE 1=1
    `;
    const params = [];

    if (q && q.trim()) {
      query += ` AND (name LIKE ? OR description LIKE ?)`;
      params.push(`%${q.trim()}%`, `%${q.trim()}%`);
    }

    if (city && city.trim()) {
      query += ` AND city LIKE ?`;
      params.push(`%${city.trim()}%`);
    }

    query += ` ORDER BY name ASC`;

    const connection = await db.getConnection();
    const [accommodations] = await connection.query(query, params);
    connection.release();

    res.json(accommodations);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ error: "Failed to fetch accommodations" });
  }
}

export async function getAccommodationById(req, res) {
  try {
    const { id } = req.params;

    const connection = await db.getConnection();

    // Get hotel
    const [hotels] = await connection.query(
      `SELECT id, name, address, city, country, latitude, longitude, 
              stars, phone, description, facilities, price_from as price, photo_url
       FROM hotels WHERE id = ?`,
      [id]
    );

    if (hotels.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Hotel not found" });
    }

    const hotel = hotels[0];

    // Get rooms for this hotel
    const [rooms] = await connection.query(
      `SELECT id, hotel_id, room_type, description, price_per_night, capacity, amenities, photo_url
       FROM hotel_rooms WHERE hotel_id = ?`,
      [id]
    );

    connection.release();

    res.json({
      ...hotel,
      rooms: rooms || []
    });
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    res.status(500).json({ error: "Failed to fetch accommodation" });
  }
}
