import db from "../config/db.js";

const ACCOMMODATIONS_LIKED_LIST_NAME = "Hébergements likées";

class Friend {
  static async searchUsers(currentUserId, query) {
    const likeQuery = `%${query}%`;
    const [rows] = await db.execute(
      `SELECT
         u.id,
         u.username,
         u.first_name,
         u.last_name,
         u.user_type,
         u.created_at,
         EXISTS(
           SELECT 1
           FROM friendships f
           WHERE f.user_id = ? AND f.friend_id = u.id
         ) AS is_friend
       FROM users u
       WHERE u.id <> ?
         AND u.user_type <> 'admin'
         AND (
           u.username LIKE ?
           OR u.first_name LIKE ?
           OR u.last_name LIKE ?
           OR CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) LIKE ?
         )
       ORDER BY is_friend DESC, u.username ASC
       LIMIT 20`,
      [currentUserId, currentUserId, likeQuery, likeQuery, likeQuery, likeQuery]
    );

    return rows || [];
  }

  static async addFriend(userId, friendId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [users] = await connection.execute(
        "SELECT id, user_type FROM users WHERE id = ? LIMIT 1",
        [friendId]
      );

      if (!users.length) {
        throw new Error("USER_NOT_FOUND");
      }
      if (users[0].user_type === "admin") {
        throw new Error("INVALID_FRIEND");
      }

      await connection.execute(
        "INSERT IGNORE INTO friendships (user_id, friend_id) VALUES (?, ?)",
        [userId, friendId]
      );
      await connection.execute(
        "INSERT IGNORE INTO friendships (user_id, friend_id) VALUES (?, ?)",
        [friendId, userId]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getFriends(userId) {
    const [rows] = await db.execute(
      `SELECT
         u.id,
         u.username,
         u.first_name,
         u.last_name,
         u.user_type,
         u.created_at,
         f.created_at AS friend_since,
         (
           SELECT COUNT(*)
           FROM favorites fav
           WHERE fav.user_id = u.id
         ) AS liked_restaurants,
         (
           SELECT COUNT(*)
           FROM list_accommodations la
           JOIN lists l ON l.id = la.list_id
           WHERE l.user_id = u.id
             AND l.name = ?
         ) AS liked_accommodations
       FROM friendships f
       JOIN users u ON u.id = f.friend_id
       WHERE f.user_id = ?
       ORDER BY u.first_name ASC, u.last_name ASC, u.username ASC`,
      [ACCOMMODATIONS_LIKED_LIST_NAME, userId]
    );

    return rows || [];
  }

  static async getFriendPublicProfile(userId, friendId) {
    const [friendshipRows] = await db.execute(
      "SELECT 1 FROM friendships WHERE user_id = ? AND friend_id = ? LIMIT 1",
      [userId, friendId]
    );

    if (!friendshipRows.length) {
      return null;
    }

    const [users] = await db.execute(
      `SELECT
         id,
         username,
         first_name,
         last_name,
         user_type,
         created_at
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [friendId]
    );

    if (!users.length) {
      return null;
    }

    const [statsRows] = await db.execute(
      `SELECT
         (
           SELECT COUNT(*)
           FROM favorites fav
           WHERE fav.user_id = ?
         ) AS liked_restaurants,
         (
           SELECT COUNT(*)
           FROM list_accommodations la
           JOIN lists l ON l.id = la.list_id
           WHERE l.user_id = ?
             AND l.name = ?
         ) AS liked_accommodations`,
      [friendId, friendId, ACCOMMODATIONS_LIKED_LIST_NAME]
    );

    const [restaurantFavorites] = await db.execute(
      `SELECT r.*
       FROM favorites fav
       JOIN restaurants r ON r.id = fav.restaurant_id
       WHERE fav.user_id = ?
       ORDER BY fav.created_at DESC
       LIMIT 4`,
      [friendId]
    );

    if (restaurantFavorites.length) {
      const restaurantIds = restaurantFavorites.map((restaurant) => restaurant.id);
      const placeholders = restaurantIds.map(() => "?").join(",");
      const [photos] = await db.execute(
        `SELECT restaurant_id, url, position
         FROM restaurant_photos
         WHERE restaurant_id IN (${placeholders})
         ORDER BY restaurant_id, position ASC`,
        restaurantIds
      );

      const photoMap = {};
      for (const photo of photos) {
        if (!photoMap[photo.restaurant_id]) {
          photoMap[photo.restaurant_id] = [];
        }
        photoMap[photo.restaurant_id].push({
          url: photo.url,
          position: photo.position,
        });
      }

      restaurantFavorites.forEach((restaurant) => {
        restaurant.photos = photoMap[restaurant.id] || [];
      });
    }

    const [accommodationFavorites] = await db.execute(
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
       FROM lists l
       JOIN list_accommodations la ON la.list_id = l.id
       JOIN accommodation a ON a.id = la.accommodation_id
       WHERE l.user_id = ?
         AND l.name = ?
       ORDER BY la.added_at DESC
       LIMIT 4`,
      [friendId, ACCOMMODATIONS_LIKED_LIST_NAME]
    );

    return {
      user: users[0],
      stats: statsRows[0] || { liked_restaurants: 0, liked_accommodations: 0 },
      favoriteRestaurants: restaurantFavorites,
      favoriteAccommodations: accommodationFavorites,
    };
  }
}

export default Friend;
