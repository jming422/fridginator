/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState, useContext } from 'react';
import moment from 'moment/moment';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import SearchContext from '../../context/SearchContext';

import QuantityPicker from '../../components/QuantityPicker';
import ListDivider from '../../components/ListDivider';
import SearchView from '../../components/SearchView';

import { ALL_CATEGORIES, isFridgeCategory, isFreezerCategory } from '../../utils/categories';

const d2 = moment.duration(2, 'weeks');
const d1 = moment.duration(1, 'week');
const d = moment.duration(2, 'days');

const things = [
  { name: 'thing0', quantity: 12, category: 'Eggs & Dairy', location: 'Freezer', duration: d2 },
  { name: 'thing1', quantity: 1, category: 'Eggs & Dairy', location: 'Freezer', duration: d1 },
  { name: 'thing2', quantity: 2, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing3', quantity: 3, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing4', quantity: 4, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing5', quantity: 5, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing6', quantity: 6, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing7', quantity: 7, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing8', quantity: 8, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing9', quantity: 9, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing10', quantity: 10, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
  { name: 'thing11', quantity: 11, category: 'Eggs & Dairy', location: 'Freezer', duration: d },
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
  const [quantity, setQuantity] = useState(0);

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
      <QuantityPicker qty={quantity} setQty={setQuantity} />
      <div css={addSaveStyle} onClick={() => addNewItem(name, category, location, quantity)}>
        Add
      </div>
    </li>
  );
}

function AddSearch() {
  const [q] = useContext(SearchContext);

  const [adding, setAdding] = useState(false);
  const [qtys, setQtys] = useState(things.map(({ quantity }) => quantity));

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
          {things.map((t, i) => {
            let status = 'normal';
            if (t.duration.asWeeks() >= 2) status = 'red';
            else if (t.duration.asWeeks() >= 1) status = 'orange';

            return (
              <li key={i} css={listItemStyle(status)}>
                <div css={itemNameStyle}>{t.name}</div>
                <div>{t.category}</div>
                <div>
                  {t.location} ({t.duration.humanize()})
                </div>
                <QuantityPicker
                  qty={qtys[i]}
                  setQty={(newQty) =>
                    setQtys((oldQtys) => {
                      const newQtys = _.clone(oldQtys);
                      newQtys[i] = newQty;
                      return newQtys;
                    })
                  }
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
