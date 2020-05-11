/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState, useEffect } from 'react'; // eslint-disable-line
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Provider } from 'use-http';

import SearchContext from './context/SearchContext';

import BackButton from './components/BackButton';
import Home from './views/Home';
import ViewSearch from './views/ViewSearch';
import AddSearch from './views/AddSearch';

const appContainer = css`
  height: 100vh;
  width: 90vw;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  position: relative;
`;

function App() {
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(params.get('q') || '');

  useEffect(() => {
    const unlisten = history.listen((_0, action) => {
      if (action === 'POP') {
        setQ('');
      }
    });
    return unlisten;
  }, [setQ, history]);

  return (
    <SearchContext.Provider value={[q, setQ]}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/view">
          <BackButton />
          <ViewSearch />
        </Route>
        <Route path="/add">
          <BackButton />
          <AddSearch />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </SearchContext.Provider>
  );
}

function AppContainer() {
  return (
    <div className="App" css={appContainer}>
      <Router>
        <Provider url="/api/v1">
          <App />
        </Provider>
      </Router>
    </div>
  );
}

export default AppContainer;
