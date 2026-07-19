import mysql from "mysql2/promise";

let pool;
let dbAvailable = null; // null = untested, true = ok, false = failed

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "gpiw_di_khan",
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 3000,
      namedPlaceholders: true
    });

    // Prevent unhandled errors from background connection failures
    pool.on('error', (err) => {
      dbAvailable = false;
      console.warn('Database unavailable, using fallback data:', err.message || err.code || 'connection failed');
    });
  }
  return pool;
}

export function isDbAvailable() {
  return dbAvailable !== false;
}

export async function query(sql, params = {}) {
  try {
    const [rows] = await getPool().execute(sql, params);
    dbAvailable = true;
    return rows;
  } catch (err) {
    dbAvailable = false;
    throw err;
  }
}

export async function one(sql, params = {}) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

