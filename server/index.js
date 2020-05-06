const path = require('path');

const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const respond = require('koa-respond');
const serve = require('koa-static');

const router = require('./router');

const PORT = parseInt(process.env.PORT, 10) || 5000;

const app = new Koa();

app.use(logger());
app.use(BodyParser());
app.use(respond());

app.use(serve(path.join(__dirname, '..', '/build')));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
