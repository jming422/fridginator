#!/bin/bash

createdb fridginator
echo 'DATABASE_URL=postgres://localhost/fridginator' >> .env
echo 'NODE_ENV=development' >> .env
npm install
npm run migrate up
