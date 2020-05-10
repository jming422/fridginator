const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'development' ? false : { rejectUnauthorized: false },
});

/**
 * Runs the provided function within a SQL transaction.
 * @param {Function} fn - Called with one argument, `client`, the DB client
 */
async function txn(fn) {
  const client = await pool.connect();
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

module.exports = {
  txn,
  // Apparently the way pg promisifies things doesn't work unless we wrap
  // their functions like this:
  query: (...args) => pool.query(...args),
  connect: (...args) => pool.connect(...args),
};
