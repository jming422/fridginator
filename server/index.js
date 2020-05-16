/*
 * Fridginator - Keep track of what's in your fridge (and how long it's been there)
 * Copyright © 2020 Jonathan Ming
 *
 * Fridginator is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Fridginator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Fridginator.  If not, see <http://www.gnu.org/licenses/>.
 */

require('dotenv').config();

const path = require('path');

const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Logger = require('koa-logger');
const Respond = require('koa-respond');
const Serve = require('koa-static');

const PORT = parseInt(process.env.PORT, 10) || 5000;
const buildDir = path.resolve(__dirname, '..', 'build');

const router = require('./router').withDefault(buildDir, 'index.html');

const app = new Koa();

app.use(Logger());
app.use(BodyParser());
app.use(Respond());

app.use(Serve(buildDir));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
