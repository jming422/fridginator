/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useContext } from 'react';
import Fuse from 'fuse.js';

import SearchContext from '../../context/SearchContext';
import ItemsListContext from '../../context/ItemsListContext';

import ItemList from '../../components/ItemList';

function SearchList({ place, category }) {
  const [items /*, refresh */] = useContext(ItemsListContext);
  const [q] = useContext(SearchContext);

  const filteredItems = items.filter((t) => t.location === place && (!category || t.category === category));
  const fuse = new Fuse(filteredItems, { keys: ['name'] });

  const results = q ? fuse.search(q).map(({ item }) => item) : filteredItems;

  return <ItemList items={results} />;
}

export default SearchList;
