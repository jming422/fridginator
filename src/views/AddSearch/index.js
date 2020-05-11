/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState, useContext } from 'react'; // eslint-disable-line
import Fuse from 'fuse.js';
import useFetch from 'use-http';
import Truncate from 'react-truncate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

import SearchContext from '../../context/SearchContext';
import { itemsOpts } from '../../utils/fetchOpts';

import Message from '../../components/Message';
import QuantityPicker from '../../components/QuantityPicker';
import ListDivider from '../../components/ListDivider';
import SearchView from '../../components/SearchView';

import { ALL_CATEGORIES, isFridgeCategory, isFreezerCategory, idToName } from '../../utils/categories';

const listStyle = css`
  height: 100%;
  width: 100%;
  max-width: 70rem;
  margin-top: -2rem;
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
    justify-content: flex-end;
    align-items: center;
    text-align: left;

    margin: 2rem 0rem;
    padding: 1rem;

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
  flex-grow: 1;
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
  transition: all 0.15s ease-out;
`;

const addBtnAnim = (adding) => css`
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

const categoryStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
  min-width: 8.5rem;
  max-width: 25%;
`;

const iconStyle = css`
  color: var(--blue);
  margin-right: 0.5rem;
`;

const pickerStyle = css`
  min-width: 8rem;
  width: 10%;
  margin-left: 1rem;
`;

function categoryShouldBeDisabled(category, location) {
  return (
    (location === 'fridge' && !isFridgeCategory(category)) || (location === 'freezer' && !isFreezerCategory(category))
  );
}

function AddItem({ initial, submitFn }) {
  const [name, setName] = useState(initial || '');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const quantityState = useState(1);
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
      <div css={addSaveStyle} onClick={() => submitFn({ name, category, location, quantity })}>
        Add
      </div>
    </li>
  );
}

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
        {error && <Message type="error" message={data} />}
        {loading && <Message message="Still loading list..." />}
        <ul css={listStyle}>
          {adding && (
            <>
              <AddItem initial={q} submitFn={submitFn} />
              <ListDivider />
            </>
          )}
          {results.map(({ name, quantity, location, category, duration }, i) => {
            let status = 'normal';
            if (duration && duration.asWeeks() >= 2) status = 'red';
            else if (duration && duration.asWeeks() >= 1) status = 'orange';

            let locationIcon;
            if (location === 'fridge') locationIcon = faTint;
            else if (location === 'freezer') locationIcon = faSnowflake;

            return (
              <li key={i} css={listItemStyle(status)}>
                <div css={itemNameStyle}>
                  <Truncate lines={2}>{name}</Truncate>
                </div>
                <div css={categoryStyle}>
                  {locationIcon && <FontAwesomeIcon icon={locationIcon} css={iconStyle} />}
                  <Truncate>{idToName(category)}</Truncate>
                </div>

                <div css={pickerStyle}>
                  <QuantityPicker
                    initial={quantity}
                    onChange={(newVal) => {
                      console.log(`send to server ${newVal}`);
                      // refresh();
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </SearchView>
    </>
  );
}

export default AddSearch;
