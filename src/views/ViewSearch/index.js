/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';

import SearchContext from '../../context/SearchContext';

import Categories from './Categories';
import SearchList from './SearchList';
import SearchView from '../../components/SearchView';

function ViewSearch() {
  const [q] = useContext(SearchContext);

  const match = useRouteMatch('/view/:place');
  const place = match.params.place;

  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
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
  );
}

export default ViewSearch;
