const Router = require('@koa/router');
const send = require('koa-send');

const items = require('./routes/items');

const router = new Router();
const v1 = new Router();

v1.get('/ping', (ctx) => ctx.noContent())
  .get('/lookup/:upc', (ctx) => ctx.notImplemented())
  .get('/items/list/:location?', items.list) // ?filter={available, all} (default: available)
  .post('/items/:id?', items.upsert);

router.use('/api/v1', v1.routes(), v1.allowedMethods());

module.exports = router;
module.exports.withDefault = (root, defaultFile) => {
  router.get('*', async (ctx) => await send(ctx, defaultFile, { root }));
  return router;
};
