const model = require('../models/items');
const { VALID_LOCATIONS } = require('../models/locations');

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
  if (fltr === 'all') {
    const items = await model.getAllItems(loc);
    return ctx.ok(items);
  } else if (!fltr || fltr === 'available') {
    const items = await model.getAvailableItems(loc);
    return ctx.ok(items);
  } else {
    return ctx.badRequest(`Invalid filter: ${fltr}`);
  }
}

// post('/items/:id?', items.upsert);
async function upsert(ctx) {
  const {
    params: { id },
    request: { body },
  } = ctx;

  return ctx.notImplemented();
}

module.exports = { list, upsert };
