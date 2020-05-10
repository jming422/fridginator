require('dotenv').config();

const path = require('path');

const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Logger = require('koa-logger');
const Respond = require('koa-respond');
const Serve = require('koa-static');

const router = require('./router');

const PORT = parseInt(process.env.PORT, 10) || 5000;

const app = new Koa();

app.use(Logger());
app.use(BodyParser());
app.use(Respond());

app.use(Serve(path.join(__dirname, '..', '/build')));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
