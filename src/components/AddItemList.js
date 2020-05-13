/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState, useContext } from 'react'; // eslint-disable-line

import SearchContext from '../context/SearchContext';

import { listStyle, listItemStyle, itemNameStyle, ItemListChildren } from './ItemList';
import ListDivider from './ListDivider';
import QuantityPicker from './QuantityPicker';

import { ALL_CATEGORIES, isFridgeCategory, isFreezerCategory } from '../utils/categories';

function categoryShouldBeDisabled(category, location) {
  return (
    (location === 'fridge' && !isFridgeCategory(category)) || (location === 'freezer' && !isFreezerCategory(category))
  );
}

const addItemContainer = css`
  display: flex;
  flex-direction: column;
`;

const addItemRow = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const addInputStyle = css`
  ${itemNameStyle}
  width: 18%;
  margin-top: 1rem;
  background: transparent;
  border: none;
  border-bottom: 0.1rem solid var(--gray);
  font-size: 1.8rem;
`;

const addSelectStyle = css`
  min-width: 10rem;
`;

const addSaveStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  color: var(--white);
  background-color: var(--blue);
`;

function AddItem({ initial, submitFn }) {
  const [name, setName] = useState(initial || '');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const quantityState = useState(1);
  const [quantity] = quantityState;

  return (
    <li css={[listItemStyle(), addItemContainer]}>
      <div css={[addItemRow, { marginBottom: '1rem' }]}>
        <input
          type="text"
          css={addInputStyle}
          value={name}
          placeholder="Item name"
          onChange={(e) => setName(e.target.value)}
        />
        <QuantityPicker customState={quantityState} />
      </div>
      <div css={addItemRow}>
        <select
          css={addSelectStyle}
          value={location}
          onChange={(e) => {
            const newVal = e.target.value;
            setLocation(newVal);
            if (categoryShouldBeDisabled(category, newVal)) {
              setCategory('');
            }
          }}
        >
          <option value="" disabled>
            Location...
          </option>
          <option value="fridge">Fridge</option>
          <option value="freezer">Freezer</option>
        </select>
        <select
          css={addSelectStyle}
          value={category}
          onChange={(e) => {
            const newVal = e.target.value;
            const isFridge = isFridgeCategory(newVal);
            const isFreezer = isFreezerCategory(newVal);
            setCategory(newVal);
            if (isFridge && !isFreezer) setLocation('fridge');
            else if (!isFridge && isFreezer) setLocation('freezer');
          }}
        >
          <option value="" disabled>
            Category...
          </option>
          {ALL_CATEGORIES.map((cat, i) => (
            <option key={i} value={cat.id} disabled={categoryShouldBeDisabled(cat.id, location) ? true : null}>
              {cat.name}
            </option>
          ))}
        </select>
        <div css={addSaveStyle} onClick={() => submitFn({ name, category, location, quantity })}>
          Save
        </div>
      </div>
    </li>
  );
}

function AddItemList({ items, adding, submitFn }) {
  const [q] = useContext(SearchContext);

  return (
    <ul css={listStyle}>
      {adding && (
        <>
          <AddItem initial={q} submitFn={submitFn} />
          <ListDivider />
        </>
      )}
      <ItemListChildren items={items} />
    </ul>
  );
}

export default AddItemList;
