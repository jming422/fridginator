const pg = require('pg');
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

/**
 * Runs the provided function within a SQL transaction.
 * @param {Function} fn - Called with one argument, `client`, the DB client
 */
async function txn(fn) {
  const client = await pg.connect();
  try {
    await client.query('BEGIN');
    await fn(client);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { query: pool.query, connect: pool.connect, txn };
