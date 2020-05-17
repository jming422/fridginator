/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx } from '@emotion/core';
import React, { useContext } from 'react'; // eslint-disable-line

import SearchContext from '../context/SearchContext';
import { listStyle } from '../styles/list';

import { ItemListChildren } from './ItemList';
import ListDivider from './ListDivider';
import EditableListItem from './EditableListItem';

function AddItemList({ items, adding, submitFn, refreshFn, message }) {
  const [q] = useContext(SearchContext);

  return (
    <ul css={listStyle}>
      {adding && (
        <>
          <EditableListItem initial={{ name: q }} submitFn={submitFn} resetAfterSubmit />
          <ListDivider />
        </>
      )}
      <ItemListChildren items={items} message={message} refreshFn={refreshFn} />
    </ul>
  );
}

export default AddItemList;
