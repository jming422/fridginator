/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import useFetch from 'use-http';

import { itemsOpts } from '../../utils/fetchOpts';
import SearchContext from '../../context/SearchContext';
import ItemsListContext from '../../context/ItemsListContext';

import Categories from './Categories';
import SearchList from './SearchList';
import SearchView from '../../components/SearchView';
import Message from '../../components/Message';

function ViewSearch() {
  const [q] = useContext(SearchContext);

  const match = useRouteMatch('/view/:place');
  const place = match.params.place;

  const [refreshItems, setRefreshItems] = useState(0);
  const refresh = () => setRefreshItems((old) => old + 1);
  const loc = place ? place : '';
  const { error, data = [] } = useFetch(`/items/list/${loc}`, itemsOpts, [place, refreshItems]);

  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
    <SearchView>
      <ItemsListContext.Provider value={[data, refresh]}>
        <Switch>
          {error && <Message type="error" message={error} />}
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
      </ItemsListContext.Provider>
    </SearchView>
  );
}

export default ViewSearch;
