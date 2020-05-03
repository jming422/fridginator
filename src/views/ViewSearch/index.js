/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';

import { container } from '../../styles/positions';
import Categories from './Categories';
import SearchList from './SearchList';

import { FREEZER_CATEGORIES, FRIDGE_CATEGORIES } from '../../utils/categories';

function ViewSearch() {
  const match = useRouteMatch('/view/:place');
  const place = match.params.place;
  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
    <div css={container}>
      <Switch>
        <Route exact path={match.path}>
          <Categories />
        </Route>
        <Route path={`${match.path}/:category`}>
          <SearchList />
        </Route>
      </Switch>
    </div>
  );
}

export default ViewSearch;
