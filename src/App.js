/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react"; // eslint-disable-line
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { centerBox } from "./styles/positions";

import Home from "./views/Home";
import Categories from "./views/Categories";
import ViewSearch from "./views/ViewSearch";
import AddSearch from "./views/AddSearch";

const appContainer = css`
  height: 100vh;
  width: 80vw;
  max-width: 80rem;
  margin: auto;
  ${centerBox}
`;

function App() {
  return (
    <div className="App" css={appContainer}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/view">
            <ViewSearch />
          </Route>
          <Route path="/add">
            <AddSearch />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
