const db = require('../db');

const COLUMNS = ['id', 'name', 'location', 'category', 'quantity', 'added_timestamp', 'expiry_timestamp', 'upc_code'];

function xformForFrontend(item) {
  item.addedTimestamp = item.added_timestamp && item.added_timestamp.valueOf();
  delete item.added_timestamp;

  item.expiryTimestamp = item.expiry_timestamp && item.expiry_timestamp.valueOf();
  delete item.expiry_timestamp;

  item.upc = item.upc_code;
  delete item.upc_code;

  return item;
}

async function getAllItems(location) {
  const q = `SELECT ${COLUMNS.join(',')} FROM items`;
  const params = [];

  if (location) {
    q += ' WHERE location = $1';
    params.push(location);
  }

  const { rows } = await db.query(q, params);
  return rows.map(xformForFrontend);
}

async function getAvailableItems(location) {
  const q = `
    SELECT ${COLUMNS.join(',')}
    FROM items
    WHERE quantity > 0
  `;
  const params = [];

  if (location) {
    q += ' AND location = $1';
    params.push(location);
  }

  const { rows } = await db.query(q, params);
  return rows.map(xformForFrontend);
}

async function itemIdExists(id) {
  const { rows } = await db.query('SELECT id FROM items WHERE id = $1', [id]);
  return rows.length === 1;
}

module.exports = { getAllItems, getAvailableItems, itemIdExists };
