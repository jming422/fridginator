const Router = require('@koa/router');

const items = require('./routes/items');

const router = new Router();
const v1 = new Router();

v1.prefix('/v1')
  .get('/ping', (ctx) => ctx.noContent())
  .get('/lookup/:upc', (ctx) => ctx.notImplemented())
  .get('/items/list/:location?', items.list) // ?filter={available, all} (default: available)
  .post('/items/:id?', items.upsert);

router.prefix('/api').use(v1.routes());

module.exports = router;
