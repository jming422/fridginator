const _ = require('lodash');
const moment = require('moment');

const model = require('../models/items');
const { locationIsValid } = require('../models/locations');

// GET /items/list/:location? ?filter={available, all} (default: available)
async function list(ctx) {
  const {
    params: { location },
    query: { filter },
  } = ctx;

  const loc = location && location.toLowerCase();
  if (!locationIsValid(loc)) {
    return ctx.badRequest(`Invalid location: ${loc}`);
  }

  const fltr = filter && filter.toLowerCase();

  try {
    if (fltr === 'all') {
      const items = await model.getAllItems(loc);
      return ctx.ok(items);
    } else if (!fltr || fltr === 'available') {
      const items = await model.getAvailableItems(loc);
      return ctx.ok(items);
    } else {
      return ctx.badRequest(`Invalid filter: ${fltr}`);
    }
  } catch (err) {
    console.error(err);
    return ctx.internalServerError();
  }
}

// POST /items/:id?
async function upsert(ctx) {
  const {
    params: { id },
    request: { body },
  } = ctx;

  // Validate body
  const { valid, reason } = model.itemIsValid(!id, body);
  if (!valid) {
    return ctx.badRequest(reason);
  }

  if ('added_timestamp' in body) {
    body.added_timestamp = moment.utc(body.added_timestamp).toDate();
  }
  if ('expiry_timestamp' in body) {
    body.expiry_timestamp = moment.utc(body.expiry_timestamp).toDate();
  }

  try {
    if (id) {
      // Validate id
      if (!(await model.itemIdExists(id))) {
        return ctx.badRequest(`Cannot update nonexistent item ID ${id}`);
      }

      // Update the existing item
      await model.updateItem(id, body);
      return ctx.noContent();
    } else {
      // Insert the new item
      await model.insertItem(body);
      return ctx.noContent();
    }
  } catch (err) {
    console.error(err);
    return ctx.internalServerError();
  }
}

// DELETE /items/:id
async function deleteItem(ctx) {
  const {
    params: { id },
  } = ctx;
  try {
    // Validate id
    if (!(await model.itemIdExists(id))) {
      return ctx.badRequest(`Cannot delete nonexistent item ID ${id}`);
    }

    // Delete the item
    await model.deleteItem(id);
    return ctx.noContent();
  } catch (err) {
    console.error(err);
    return ctx.internalServerError();
  }
}

module.exports = { list, upsert, deleteItem };
