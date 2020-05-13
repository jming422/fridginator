/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useContext } from 'react';
import Fuse from 'fuse.js';

import SearchContext from '../context/SearchContext';
import ItemsListContext from '../context/ItemsListContext';

import ItemList from '../components/ItemList';

function SearchList({ place, category }) {
  const { data } = useContext(ItemsListContext);
  const [q] = useContext(SearchContext);

  const items = Array.isArray(data) ? data : [];

  const filteredItems = items.filter((t) => (!place || t.location === place) && (!category || t.category === category));
  const fuse = new Fuse(filteredItems, { keys: ['name'] });

  const results = q ? fuse.search(q).map(({ item }) => item) : filteredItems;

  return <ItemList items={results} />;
}

export default SearchList;