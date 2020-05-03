/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';

import Categories from './Categories';

function ViewSearch() {
  const match = useRouteMatch('/view/:place');
  const place = match.params.place;
  if (!['fridge', 'freezer'].includes(place)) {
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      <Route exact path={match.path}>
        <Categories />
      </Route>
      <Route path={`${match.path}/:category`}></Route>
    </Switch>
  );
}

export default ViewSearch;
