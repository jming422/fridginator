/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState, useContext } from 'react';
import moment from 'moment/moment';
import _ from 'lodash';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SearchContext from '../../context/SearchContext';

import QuantityPicker from '../../components/QuantityPicker';
import ListDivider from '../../components/ListDivider';
import SearchView from '../../components/SearchView';

import { ALL_CATEGORIES, isFridgeCategory, isFreezerCategory, idToName } from '../../utils/categories';

const d2 = moment.duration(2, 'weeks');
const d1 = moment.duration(1, 'week');
const d = moment.duration(2, 'days');

const things = [
  { id: 0, name: 'thing0', quantity: 12, category: 'eggs-dairy', location: 'fridge', duration: d2 },
  { id: 1, name: 'thing1', quantity: 1, category: 'meats', location: 'fridge', duration: d1 },
  { id: 2, name: 'thing2', quantity: 2, category: 'meats', location: 'freezer', duration: d },
  { id: 3, name: 'thing3', quantity: 3, category: 'meats', location: 'freezer', duration: d },
  { id: 4, name: 'thing4', quantity: 4, category: 'meats', location: 'freezer', duration: d },
  { id: 5, name: 'thing5', quantity: 5, category: 'meats', location: 'freezer', duration: d },
  { id: 6, name: 'thing6', quantity: 6, category: 'meats', location: 'freezer', duration: d },
  { id: 7, name: 'thing7', quantity: 7, category: 'meats', location: 'freezer', duration: d },
  { id: 8, name: 'thing8', quantity: 8, category: 'desserts', location: 'freezer', duration: d },
  { id: 9, name: 'thing9', quantity: 9, category: 'meats', location: 'freezer', duration: d },
  { id: 10, name: 'thing10', quantity: 10, category: 'drinks', location: 'fridge', duration: d },
  { id: 11, name: 'thing11', quantity: 11, category: 'vegetables', location: 'fridge', duration: d },
];

const listStyle = css`
  height: 100%;
  width: 100%;
  margin-top: -2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 0;
`;

const listItemStyle = (status) => {
  let borderColor;
  switch (status) {
    case 'red':
      borderColor = '--red';
      break;
    case 'orange':
      borderColor = '--orange';
      break;
    default:
      borderColor = '--dark-blue';
  }
  return css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 2rem;
    padding: 1.5rem;

    background-color: var(--white);
    color: var(--gray);
    border: 0.25rem solid;
    border-color: var(${borderColor});
    border-radius: 1rem;
    font-size: 1.8rem;
  `;
};

const itemNameStyle = css`
  color: var(--black);
  font-weight: bold;
`;

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
  transform: ${adding ? 'rotate(45deg)' : 'none'};
  transition: all 0.15s ease-out;
`;

const addInputStyle = css`
  ${itemNameStyle}
  width: 18%;
  background: transparent;
  border: none;
  border-bottom: 0.1rem solid var(--gray);
  font-size: 1.8rem;
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

function categoryShouldBeDisabled(category, location) {
  return (
    (location === 'fridge' && !isFridgeCategory(category)) || (location === 'freezer' && !isFreezerCategory(category))
  );
}

async function addNewItem(name, category, location, quantity) {
  console.log('click!');
}

function AddItem({ initial }) {
  const [name, setName] = useState(initial || '');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const quantityState = useState(0);
  const [quantity] = quantityState;

  return (
    <li css={listItemStyle()}>
      <input type="text" css={addInputStyle} value={name} onChange={(e) => setName(e.target.value)} />
      <select
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
      <select
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
      <QuantityPicker customState={quantityState} />
      <div css={addSaveStyle} onClick={() => addNewItem(name, category, location, quantity)}>
        Add
      </div>
    </li>
  );
}

function AddSearch() {
  const [q] = useContext(SearchContext);

  //  const fuse = new Fuse(things);

  const [adding, setAdding] = useState(false);

  return (
    <>
      <div css={addBtnStyle(adding)} onClick={() => setAdding((old) => !old)}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <SearchView>
        <ul css={listStyle}>
          {adding && (
            <>
              <AddItem initial={q} />
              <ListDivider />
            </>
          )}
          {things.map((item, i) => {
            let status = 'normal';
            if (item.duration.asWeeks() >= 2) status = 'red';
            else if (item.duration.asWeeks() >= 1) status = 'orange';

            return (
              <li key={i} css={listItemStyle(status)}>
                <div css={itemNameStyle}>{item.name}</div>
                <div>{idToName(item.category)}</div>
                <div css={{ textTransform: 'capitalize' }}>
                  {item.location} ({item.duration.humanize()})
                </div>
                <QuantityPicker
                  initial={item.quantity}
                  onChange={(newVal) => console.log(`send to server ${newVal}`)}
                />
              </li>
            );
          })}
        </ul>
      </SearchView>
    </>
  );
}

export default AddSearch;
