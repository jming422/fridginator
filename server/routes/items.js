const _ = require('lodash');

const model = require('../models/items');
const { VALID_LOCATIONS } = require('../models/locations');

// GET /items/list/:location ?filter={available, all} (default: available)
async function list(ctx) {
  const {
    params: { location },
    query: { filter },
  } = ctx;

  const loc = location && location.toLowerCase();
  if (loc && !VALID_LOCATIONS.includes(loc)) {
    return ctx.badRequest(`Invalid location: ${loc}`);
  }

  const fltr = filter && fltr.toLowerCase();

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
  const requestKeys = Object.keys(body);
  for (let requiredKey of model.NONNULL_COLUMNS) {
    if (!requestKeys.includes(requiredKey)) {
      return ctx.badRequest(`Missing required item key ${requiredKey}`);
    }
  }
  const extraRequestKeys = _.difference(requestKeys, model.NONNULL_COLUMNS, model.NULL_COLUMNS);
  if (extraRequestKeys.length > 0) {
    return ctx.badRequest(`Don't know what to do with extra keys provided: ${extraRequestKeys.join()}`);
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

module.exports = { list, upsert };
