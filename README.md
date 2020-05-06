# Fridginator

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Keep track of what's in your fridge (and how long it's been there)


## Start your own Fridginator!

 - Use the **Deploy to Heroku** button above to run it for free on Heroku
 - // OR //
 - Clone this repo, then: `npm install && npm start`


## Layout

 - Backend is a Koa.js server in the `server/` directory
 - Frontend lives in `src/` and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

You may notice that all dependencies that are strictly used by the frontend are in `devDependencies`. This is because they're only needed until the build is completed, and putting them in `devDependencies` let's Heroku know it can exclude them from the final production slug. That way, only the built app is shipped, and all the bulky React & asset packages can be pruned. Plus, when installing locally for development, a regular `npm install` just installs both anyway.

## Configuration

Fridginator reads the following environment variables:
 - `PORT` (default: 5000) - The port to start the HTTP server on
 - `DATABASE_URL` - A PostgreSQL connection string

If you deployed to Heroku using the button above, Heroku will set these for you automatically.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the backend and frontend in development mode, simultaneously.

By default, the backend will be at http://localhost:5000 and the frontend (using react-script's proxy) will be at http://localhost:3000


### `npm run build`

Builds the frontend for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run migrate`

An alias to the dev dependency [db-migrate](https://db-migrate.readthedocs.io). To run database migrations on localhost, ensure you've created a `.env` file in the project root, and in it be sure to set `NODE_ENV=development` and `DATABASE_URL` to whatever database URL you desire (e.g. `postgres://localhost/fridginator`).

To run migrations on the database specified in `.env`, use `npm run migrate up`.
