/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState, useContext } from 'react'; // eslint-disable-line
import Fuse from 'fuse.js';
import useFetch from 'use-http';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SearchContext from '../context/SearchContext';
import ItemsListContext from '../context/ItemsListContext';

import { listStyle } from '../styles/list';
import { flexCenter } from '../styles/positions';

import { ItemListChildren } from './ItemList';
import ListDivider from './ListDivider';
import EditableListItem from './EditableListItem';
import Message from '../components/Message';

const addBtnStyle = (adding) => css`
  position: absolute;
  top: 1.5rem;
  right: -1rem;
  height: 4rem;
  width: 4rem;
  border-radius: 3rem;
  font-size: 2rem;
  ${flexCenter}
  cursor: pointer;
  background-color: ${adding ? 'var(--white)' : 'var(--blue)'};
  color: ${adding ? 'var(--red)' : 'var(--white)'};
  transition: all 0.15s ease-out;
  z-index: 4;
`;

const addBtnAnim = (adding) => css`
  transform: ${adding ? 'rotate(45deg)' : 'none'};
  transition: all 0.15s ease-out;
`;

function AddableItemList({ includeNonAvailable, place, category }) {
  const [q] = useContext(SearchContext);
  const { data, error, refresh } = useContext(ItemsListContext);

  const [adding, setAdding] = useState(false);
  const { post: createItem } = useFetch('/items', { cachePolicy: 'no-cache' });

  const cat = category === 'all' ? undefined : category;
  const items = Array.isArray(data) ? data : [];
  const filteredItems = items.filter(
    (t) => (includeNonAvailable || t.quantity > 0) && (!place || t.location === place) && (!cat || t.category === cat)
  );

  async function submitFn(newItem) {
    newItem.added_timestamp = new Date().toISOString();
    await createItem(newItem);
    refresh();
  }

  const fuse = new Fuse(filteredItems, { keys: ['name', 'category', 'location'] });

  const results = q ? fuse.search(q).map(({ item }) => item) : filteredItems;

  const errMessage = <Message customCss={{ marginBottom: '2rem' }} type="error" message={data} />;

  return (
    <>
      <div css={addBtnStyle(adding)} onClick={() => setAdding((old) => !old)}>
        <FontAwesomeIcon icon={faPlus} css={addBtnAnim(adding)} />
      </div>
      <ul css={listStyle}>
        {adding && (
          <>
            <EditableListItem
              initial={{ name: q, location: place, category: cat }}
              submitFn={submitFn}
              resetAfterSubmit
            />
            <ListDivider />
          </>
        )}
        <ItemListChildren items={results} message={error && errMessage} refreshFn={refresh} />
      </ul>
    </>
  );
}

export default AddableItemList;
