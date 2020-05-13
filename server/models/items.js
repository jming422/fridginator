const _ = require('lodash');
const moment = require('moment');

const db = require('../db');
const { locationIsValid } = require('./locations');

const NONNULL_COLUMNS = ['name', 'location', 'category', 'quantity'];
const NULL_COLUMNS = ['added_timestamp', 'expiry_timestamp', 'upc_code'];

const COLUMNS = ['id'].concat(NONNULL_COLUMNS, NULL_COLUMNS);

// TODO: Something better like JSON Schema or something
function itemIsValid(isCreate, item) {
  const requestKeys = Object.keys(item);

  if (isCreate) {
    const missingRequiredKeys = _.difference(NONNULL_COLUMNS, requestKeys);
    if (missingRequiredKeys.length > 0) {
      return {
        valid: false,
        reason: `Missing required item keys: ${missingRequiredKeys.join(', ')}`,
      };
    }
  }

  const extraRequestKeys = _.difference(requestKeys, NONNULL_COLUMNS, NULL_COLUMNS);
  if (extraRequestKeys.length > 0) {
    return {
      valid: false,
      reason: `Don't know what to do with extra keys provided: ${extraRequestKeys.join(', ')}`,
    };
  }

  if ('location' in item && !locationIsValid(item.location)) {
    return {
      valid: false,
      reason: `Invalid location: ${item.location}`,
    };
  }

  if ('quantity' in item && isNaN(item.quantity)) {
    return {
      valid: false,
      reason: `Invalid quantity: ${item.quantity}`,
    };
  }

  if (
    ('added_timestamp' in item && !moment(item.added_timestamp).isValid()) ||
    ('expiry_timestamp' in item && !moment(item.expiry_timestamp).isValid())
  ) {
    return {
      valid: false,
      reason: 'Timestamps must be provided as an ISO 8601 or RFC 2822 Date time string',
    };
  }

  return { valid: true };
}

function xformForFrontend(item) {
  item.added_timestamp = item.added_timestamp && item.added_timestamp.valueOf();
  item.expiry_timestamp = item.expiry_timestamp && item.expiry_timestamp.valueOf();
  return item;
}

async function getAllItems(location) {
  let q = `SELECT ${COLUMNS.join()} FROM items`;
  const params = [];

  if (location) {
    q += ' WHERE location = $1';
    params.push(location);
  }

  const { rows } = await db.query(q, params);
  return rows.map(xformForFrontend);
}

async function getAvailableItems(location) {
  let q = `
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
  const keys = NONNULL_COLUMNS.concat(NULL_COLUMNS).filter((k) => k in item);
  const values = keys.map((k) => item[k]);

  const q = `
    INSERT INTO items (${keys})
    VALUES (${keys.map((_k, i) => `$${i + 1}`).join()})
  `;
  await db.query(q, values);
}

// Note: it's up to the route to validate `updates` before passing it into this function!
async function updateItem(id, updates) {
  const keys = NONNULL_COLUMNS.concat(NULL_COLUMNS).filter((k) => k in updates);
  const values = keys.map((k) => updates[k]);

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
  itemIsValid,
  insertItem,
  updateItem,
};
