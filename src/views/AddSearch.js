/** @jsx jsx */

import { jsx } from '@emotion/core';
import React, { useContext } from 'react'; // eslint-disable-line

import AddableItemList from '../components/AddableItemList';
import SearchView from '../components/SearchView';

function AddSearch() {
  return (
    <SearchView>
      <AddableItemList includeNonAvailable />
    </SearchView>
  );
}

export default AddSearch;
