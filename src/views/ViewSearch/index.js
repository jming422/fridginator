/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';

import SearchContext from '../../context/SearchContext';
import ItemsListContext from '../../context/ItemsListContext';

import Categories from './Categories';
import SearchList from './SearchList';
import SearchView from '../../components/SearchView';
import Message from '../../components/Message';

function ViewSearch() {
  const [q] = useContext(SearchContext);
  const { error, loading, data } = useContext(ItemsListContext);

  const match = useRouteMatch('/view/:place');
  const place = match.params.place;

  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
    <SearchView>
      <Switch>
        {error && <Message customCss={{ marginBottom: '2rem' }} type="error" message={data} />}
        {loading && <Message customCss={{ marginBottom: '2rem' }} message="Still loading list..." />}
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
