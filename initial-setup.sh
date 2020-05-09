#!/bin/bash
set -e

echo '🗄 Creating local PostgreSQL database "fridginator"...'
createdb fridginator

echo '📁 Generating .env configuration file...'
echo 'NODE_ENV=development' > .env
echo 'DATABASE_URL=postgres://localhost/fridginator' >> .env

echo '⚙️ Installing dependencies...'
npm install

echo '🚢 Executing database migrations...'
npm run migrate up

echo '🎉 Done! Run `npm start` to launch the app.'
