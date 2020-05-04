/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';

import SearchContext from '../../context/SearchContext';

import BackButton from '../../components/BackButton';
import Categories from './Categories';
import SearchList from './SearchList';
import SearchView from '../../components/SearchView';

function ViewSearch() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(params.get('q') || '');

  const match = useRouteMatch('/view/:place');
  const place = match.params.place;

  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
    <SearchContext.Provider value={[q, setQ]}>
      <BackButton />
      <SearchView>
        <Switch>
          <Route exact path={match.path}>
            {q ? <SearchList place={place} /> : <Categories />}
          </Route>
          <Route
            path={`${match.path}/:category`}
            render={(routeProps) => {
              const category = routeProps.match.params.category;
              return <SearchList place={place} category={category} />;
            }}
          />
        </Switch>
      </SearchView>
    </SearchContext.Provider>
  );
}

export default ViewSearch;
