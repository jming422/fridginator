/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState, useContext } from 'react'; // eslint-disable-line
import Fuse from 'fuse.js';
import useFetch from 'use-http';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SearchContext from '../../context/SearchContext';
import { itemsOpts } from '../../utils/fetchOpts';

import Message from '../../components/Message';
import SearchView from '../../components/SearchView';
import AddItemList from '../../components/AddItemList';

const addBtnStyle = (adding) => css`
  position: absolute;
  top: 1.5rem;
  right: -1rem;
  height: 4rem;
  width: 4rem;
  border-radius: 3rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${adding ? 'var(--white)' : 'var(--blue)'};
  color: ${adding ? 'var(--red)' : 'var(--white)'};
  transition: all 0.15s ease-out;
`;

const addBtnAnim = (adding) => css`
  transform: ${adding ? 'rotate(45deg)' : 'none'};
  transition: all 0.15s ease-out;
`;

function AddSearch() {
  const [q] = useContext(SearchContext);
  const [adding, setAdding] = useState(false);
  const [refreshItems, setRefreshItems] = useState(0);
  const refresh = () => setRefreshItems((old) => old + 1);
  const { error, loading, data } = useFetch('/items/list?filter=all', itemsOpts, [refreshItems]);

  const items = Array.isArray(data) ? data : [];

  const submitFn = async (newItem) => {
    console.log(`add new item plz server: ${JSON.stringify(newItem)}`);
    refresh();
  };

  const fuse = new Fuse(items, { keys: ['name', 'category', 'location'] });

  const results = q ? fuse.search(q).map(({ item }) => item) : items;

  return (
    <>
      <div css={addBtnStyle(adding)} onClick={() => setAdding((old) => !old)}>
        <FontAwesomeIcon icon={faPlus} css={addBtnAnim(adding)} />
      </div>
      <SearchView>
        {error && <Message customCss={{ marginBottom: '2rem' }} type="error" message={data} />}
        {loading && <Message customCss={{ marginBottom: '2rem' }} message="Still loading list..." />}
        <AddItemList items={results} adding={adding} submitFn={submitFn} />
      </SearchView>
    </>
  );
}

export default AddSearch;
