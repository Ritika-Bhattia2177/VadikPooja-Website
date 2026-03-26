import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const query = async (sql, params = []) => {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const [rows] = await connection.execute(sql, params);
    return rows;

  } catch (err) {
    console.error("MySQL Query Error:", err && err.message ? err.message : err);
    throw err;

  } finally {
    if (connection) await connection.end(); // ensure connection closed
  }
};

// Backwards-compatible callback-style `db` to support existing controllers.
export const db = {
  query: (sql, params, cb) => {
    // support signatures: (sql, cb) or (sql, params, cb)
    if (typeof params === 'function') {
      cb = params;
      params = [];
    }

    query(sql, params)
      .then((rows) => cb ? cb(null, rows) : null)
      .catch((err) => cb ? cb(err) : null);
  }
};