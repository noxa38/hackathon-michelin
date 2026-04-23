import db from "../config/db.js";

class List {
  static async findByUserId(userId) {
    try {
      const [rows] = await db.execute(
        `SELECT l.*,
                (
                  SELECT COUNT(*)
                  FROM list_restaurants lr
                  WHERE lr.list_id = l.id
                ) AS restaurant_count,
                (
                  SELECT COUNT(*)
                  FROM list_accommodations la
                  WHERE la.list_id = l.id
                ) AS accommodation_count,
                (
                  (
                    SELECT COUNT(*)
                    FROM list_restaurants lr
                    WHERE lr.list_id = l.id
                  ) + (
                    SELECT COUNT(*)
                    FROM list_accommodations la
                    WHERE la.list_id = l.id
                  )
                ) AS item_count
         FROM lists l
         WHERE l.user_id = ?
         ORDER BY l.created_at DESC`,
        [userId]
      );
      return rows || [];
    } catch (err) {
      throw err;
    }
  }

  static async findById(id, userId) {
    try {
      const [rows] = await db.execute(
        `SELECT l.*,
                (
                  SELECT COUNT(*)
                  FROM list_restaurants lr
                  WHERE lr.list_id = l.id
                ) AS restaurant_count,
                (
                  SELECT COUNT(*)
                  FROM list_accommodations la
                  WHERE la.list_id = l.id
                ) AS accommodation_count,
                (
                  (
                    SELECT COUNT(*)
                    FROM list_restaurants lr
                    WHERE lr.list_id = l.id
                  ) + (
                    SELECT COUNT(*)
                    FROM list_accommodations la
                    WHERE la.list_id = l.id
                  )
                ) AS item_count
         FROM lists l
                WHERE l.id = ? AND l.user_id = ?`,
        [id, userId]
      );
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async create(userId, name, description = "") {
    try {
      const result = await db.execute(
        "INSERT INTO lists (user_id, name, description) VALUES (?, ?, ?)",
        [userId, name, description]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async update(id, userId, data) {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      fields.push(`${dbKey} = ?`);
      values.push(value);
    });

    values.push(id);
    values.push(userId);

    try {
      const result = await db.execute(
        `UPDATE lists SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`,
        values
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.execute(
        "DELETE FROM lists WHERE id = ? AND user_id = ?",
        [id, userId]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async addRestaurant(listId, restaurantId, userId) {
    try {
      // Vérifier que la liste appartient à l'utilisateur
      const [listRows] = await db.execute(
        "SELECT id FROM lists WHERE id = ? AND user_id = ?",
        [listId, userId]
      );
      
      if (listRows.length === 0) throw new Error("List not found");
      
      const result = await db.execute(
        "INSERT IGNORE INTO list_restaurants (list_id, restaurant_id) VALUES (?, ?)",
        [listId, restaurantId]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async removeRestaurant(listId, restaurantId, userId) {
    try {
      const result = await db.execute(
        `DELETE lr FROM list_restaurants lr
         JOIN lists l ON lr.list_id = l.id
         WHERE lr.list_id = ? AND lr.restaurant_id = ? AND l.user_id = ?`,
        [listId, restaurantId, userId]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async getRestaurants(listId, userId) {
    try {
      const [rows] = await db.execute(
        `SELECT r.* FROM restaurants r
         JOIN list_restaurants lr ON r.id = lr.restaurant_id
         JOIN lists l ON lr.list_id = l.id
         WHERE lr.list_id = ? AND l.user_id = ?
         ORDER BY lr.added_at DESC`,
        [listId, userId]
      );
      if (!rows || rows.length === 0) return [];
      // Attach photos from restaurant_photos table
      const ids = rows.map((r) => r.id);
      const placeholders = ids.map(() => '?').join(',');
      const [photos] = await db.execute(
        `SELECT restaurant_id, url, caption, position
         FROM restaurant_photos
         WHERE restaurant_id IN (${placeholders})
         ORDER BY restaurant_id, position ASC`,
        ids
      );
      const photoMap = {};
      for (const p of photos) {
        if (!photoMap[p.restaurant_id]) photoMap[p.restaurant_id] = [];
        photoMap[p.restaurant_id].push({ url: p.url, caption: p.caption, position: p.position });
      }
      return rows.map((r) => ({ ...r, photos: photoMap[r.id] ?? [] }));
    } catch (err) {
      throw err;
    }
  }

  static async findOrCreateByName(userId, name) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM lists WHERE user_id = ? AND name = ? LIMIT 1",
        [userId, name]
      );
      if (rows.length > 0) return rows[0];
      const result = await db.execute(
        "INSERT INTO lists (user_id, name, description) VALUES (?, ?, ?)",
        [userId, name, ""]
      );
      const [newRows] = await db.execute(
        "SELECT * FROM lists WHERE id = ?",
        [result[0].insertId]
      );
      return newRows[0];
    } catch (err) {
      throw err;
    }
  }

  static async addAccommodation(listId, accommodationId, userId, accommodationSource = "hotels") {
    try {
      const [listRows] = await db.execute(
        "SELECT id FROM lists WHERE id = ? AND user_id = ?",
        [listId, userId]
      );
      if (listRows.length === 0) throw new Error("List not found");
      await db.execute(
        "INSERT IGNORE INTO list_accommodations (list_id, accommodation_id, accommodation_source) VALUES (?, ?, ?)",
        [listId, accommodationId, accommodationSource]
      );
    } catch (err) {
      throw err;
    }
  }

  static async removeAccommodation(listId, accommodationId, userId) {
    try {
      await db.execute(
        `DELETE la FROM list_accommodations la
         JOIN lists l ON la.list_id = l.id
         WHERE la.list_id = ? AND la.accommodation_id = ? AND l.user_id = ?`,
        [listId, accommodationId, userId]
      );
    } catch (err) {
      throw err;
    }
  }

  static async getAccommodations(listId, userId) {
    try {
      const [rows] = await db.execute(
        `SELECT
            CASE
              WHEN COALESCE(la.accommodation_source, 'hotels') = 'accommodations' THEN CONCAT('a-', a.id)
              ELSE CONCAT('h-', h.id)
            END AS id,
            COALESCE(la.accommodation_source, 'hotels') AS source,
            COALESCE(a.name, h.name) AS name,
            COALESCE(a.city, h.city) AS city,
            CASE
              WHEN COALESCE(la.accommodation_source, 'hotels') = 'accommodations' THEN 'Hébergement'
              WHEN h.stars >= 4 THEN 'Hôtel de luxe'
              WHEN h.stars = 3 THEN 'Hôtel haut de gamme'
              ELSE 'Hôtel'
            END AS category,
            COALESCE(a.address, h.address) AS address,
            COALESCE(a.country, h.country) AS country,
            a.photo_url AS photo_url,
            h.photo_url AS image_url,
            COALESCE(a.stars, h.stars) AS stars,
            h.stars AS rating_stars,
            COALESCE(a.latitude, h.latitude) AS latitude,
            COALESCE(a.longitude, h.longitude) AS longitude,
            COALESCE(a.phone, h.phone) AS phone,
            COALESCE(a.description, h.description) AS description,
            COALESCE(a.facilities, h.facilities) AS facilities,
            COALESCE(a.price_from, h.price_from) AS price_from
         FROM list_accommodations la
         JOIN lists l ON la.list_id = l.id
         LEFT JOIN hotels h
           ON COALESCE(la.accommodation_source, 'hotels') = 'hotels'
          AND h.id = la.accommodation_id
         LEFT JOIN accommodations a
           ON COALESCE(la.accommodation_source, 'hotels') = 'accommodations'
          AND a.id = la.accommodation_id
         WHERE la.list_id = ? AND l.user_id = ?
           AND (h.id IS NOT NULL OR a.id IS NOT NULL)
         ORDER BY la.added_at DESC`,
        [listId, userId]
      );
      return rows || [];
    } catch (err) {
      throw err;
    }
  }
}

export default List;
