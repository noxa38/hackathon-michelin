
const mysql = require("mysql2/promise");
require("dotenv").config({ path: "./.env" });

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  try {
    console.log("--- KEY_COLUMN_USAGE ---");
    const [keys] = await connection.execute(
      `SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
       FROM information_schema.KEY_COLUMN_USAGE 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
      [process.env.DB_NAME, "list_accommodations"]
    );
    console.table(keys);

    console.log("\n--- STATISTICS ---");
    const [stats] = await connection.execute(
      `SELECT INDEX_NAME, COLUMN_NAME, SEQ_IN_INDEX, NON_UNIQUE 
       FROM information_schema.STATISTICS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
      [process.env.DB_NAME, "list_accommodations"]
    );
    console.table(stats);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

run();

