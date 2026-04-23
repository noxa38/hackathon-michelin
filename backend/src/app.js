import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaurant.routes.js";
import authRoutes from "./routes/auth.routes.js";
import listRoutes from "./routes/list.routes.js";
import professionalRoutes from "./routes/professional.routes.js";
import accommodationRoutes from "./routes/accommodation.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import friendRoutes from "./routes/friend.routes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api", professionalRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "API Michelin Guide" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS friendships (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        friend_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_friendships_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_friendships_friend FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_friendship (user_id, friend_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS list_accommodations (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        list_id          INT NOT NULL,
        accommodation_id INT NOT NULL,
        accommodation_source VARCHAR(30) NOT NULL DEFAULT 'hotels',
        added_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_list_acc_list FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
        UNIQUE KEY unique_list_accommodation (list_id, accommodation_source, accommodation_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    const [accommodationSourceColumn] = await pool.query(`
      SHOW COLUMNS FROM list_accommodations LIKE 'accommodation_source'
    `);
    if (!Array.isArray(accommodationSourceColumn) || accommodationSourceColumn.length === 0) {
      await pool.execute(`
        ALTER TABLE list_accommodations
        ADD COLUMN accommodation_source VARCHAR(30) NOT NULL DEFAULT 'hotels' AFTER accommodation_id
      `);
    }

    const [accommodationForeignKeys] = await pool.query(`
      SELECT CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'list_accommodations'
        AND COLUMN_NAME = 'accommodation_id'
        AND REFERENCED_TABLE_NAME IS NOT NULL
    `);
    if (Array.isArray(accommodationForeignKeys)) {
      for (const foreignKey of accommodationForeignKeys) {
        if (foreignKey?.CONSTRAINT_NAME) {
          await pool.execute(`
            ALTER TABLE list_accommodations
            DROP FOREIGN KEY ${foreignKey.CONSTRAINT_NAME}
          `);
        }
      }
    }

    const [uniqueIndexes] = await pool.query(`
      SELECT INDEX_NAME, GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS index_columns
      FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'list_accommodations'
        AND NON_UNIQUE = 0
      GROUP BY INDEX_NAME
    `);
    const accommodationUniqueIndex = Array.isArray(uniqueIndexes)
      ? uniqueIndexes.find((index) => index?.INDEX_NAME === 'unique_list_accommodation')
      : null;

    if (accommodationUniqueIndex?.index_columns !== 'list_id,accommodation_source,accommodation_id') {
      const [listIdIndexRows] = await pool.query(`
        SELECT INDEX_NAME
        FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'list_accommodations'
          AND COLUMN_NAME = 'list_id'
        GROUP BY INDEX_NAME
      `);
      const hasStandaloneListIdIndex = Array.isArray(listIdIndexRows)
        && listIdIndexRows.some((index) => index?.INDEX_NAME === 'idx_list_accommodations_list_id');

      if (!hasStandaloneListIdIndex) {
        await pool.execute(`
          ALTER TABLE list_accommodations
          ADD INDEX idx_list_accommodations_list_id (list_id)
        `);
      }

      if (accommodationUniqueIndex) {
        await pool.execute(`
          ALTER TABLE list_accommodations
          DROP INDEX unique_list_accommodation
        `);
      }
      await pool.execute(`
        ALTER TABLE list_accommodations
        ADD UNIQUE KEY unique_list_accommodation (list_id, accommodation_source, accommodation_id)
      `);
    }

    console.log("list_accommodations table ready");
  } catch (err) {
    console.error("Migration warning:", err.message);
  }
});