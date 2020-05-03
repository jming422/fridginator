/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useRouteMatch, Redirect, Switch, Route, useLocation } from 'react-router-dom';

import Categories from './Categories';
import SearchList from './SearchList';
import SearchView from '../../components/SearchView';

function ViewSearch() {
  const match = useRouteMatch('/view/:place');
  const place = match.params.place;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get('q');

  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
    <SearchView q={q}>
      <Switch>
        <Route exact path={match.path}>
          {q ? <SearchList q={q} place={place} /> : <Categories />}
        </Route>
        <Route
          path={`${match.path}/:category`}
          render={(routeProps) => {
            const category = routeProps.match.params.category;
            return <SearchList q={q} place={place} category={category} />;
          }}
        />
      </Switch>
    </SearchView>
  );
}

export default ViewSearch;
