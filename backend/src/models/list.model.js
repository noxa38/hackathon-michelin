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
        `SELECT restaurant_id, url, position
         FROM restaurant_photos
         WHERE restaurant_id IN (${placeholders})
         ORDER BY restaurant_id, position ASC`,
        ids
      );
      const photoMap = {};
      for (const p of photos) {
        if (!photoMap[p.restaurant_id]) photoMap[p.restaurant_id] = [];
        photoMap[p.restaurant_id].push({ url: p.url, position: p.position });
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

  static async addAccommodation(listId, accommodationId, userId, accommodationSource = "accommodation") {
    try {
      void accommodationSource;
      const normalizedSource = "accommodation";
      const [listRows] = await db.execute(
        "SELECT id FROM lists WHERE id = ? AND user_id = ?",
        [listId, userId]
      );
      if (listRows.length === 0) throw new Error("List not found");
      await db.execute(
        "INSERT IGNORE INTO list_accommodations (list_id, accommodation_id, accommodation_source) VALUES (?, ?, ?)",
        [listId, accommodationId, normalizedSource]
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
            CONCAT('a-', a.id) AS id,
            'accommodation' AS source,
            a.name AS name,
            a.city AS city,
            COALESCE(a.award, 'Hôtel') AS category,
            a.address AS address,
            a.country AS country,
            a.photo_url AS photo_url,
            a.photo_url AS image_url,
            a.award AS award,
            NULL AS latitude,
            NULL AS longitude,
            a.phone AS phone,
            a.website_url AS website_url,
            a.description AS description,
            a.facilities AS facilities,
            a.price_from AS price_from
         FROM list_accommodations la
         JOIN lists l ON la.list_id = l.id
         JOIN accommodation a ON a.id = la.accommodation_id
         WHERE la.list_id = ? AND l.user_id = ?
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
