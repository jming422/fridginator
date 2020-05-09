const _ = require('lodash');

const db = require('../db');

const NONNULL_COLUMNS = ['name', 'location', 'category', 'quantity'];
const NULL_COLUMNS = ['added_timestamp', 'expiry_timestamp', 'upc_code'];

const COLUMNS = ['id'].concat(NONNULL_COLUMNS, NULL_COLUMNS);

function xformForFrontend(item) {
  item.added_timestamp = item.added_timestamp && item.added_timestamp.valueOf();
  item.expiry_timestamp = item.expiry_timestamp && item.expiry_timestamp.valueOf();
  return item;
}

async function getAllItems(location) {
  const q = `SELECT ${COLUMNS.join()} FROM items`;
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
    SELECT ${COLUMNS.join()}
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

// Note: it's up to the route to validate `item` before passing it into this function!
async function insertItem(item) {
  const [keys, values] = _.unzip(Object.entries(item));

  const q = `
    INSERT INTO items (${keys.join()})
    VALUES (${keys.map((_k, i) => `$${i + 1}`).join()})
  `;
  await db.query(q, values);
}

// Note: it's up to the route to validate `updates` before passing it into this function!
async function updateItem(id, updates) {
  const [keys, values] = _.unzip(Object.entries(updates));

  const q = `
    UPDATE items
    SET ${keys.map((k, i) => `${k} = $${i + 2}`).join()}
    WHERE id = $1
  `;
  await db.query(q, [id, ...values]);
}

module.exports = {
  COLUMNS,
  NONNULL_COLUMNS,
  NULL_COLUMNS,
  getAllItems,
  getAvailableItems,
  itemIdExists,
  insertItem,
  updateItem,
};
