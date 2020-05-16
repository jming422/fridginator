/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useState } from 'react'; // eslint-disable-line

import { listItemStyle, itemNameStyle } from '../styles/list';
import QuantityPicker from './QuantityPicker';

import { ALL_CATEGORIES, isFridgeCategory, isFreezerCategory } from '../utils/categories';
import { flexCenter } from '../styles/positions';

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
  ${flexCenter}
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  color: var(--white);
  background-color: var(--blue);
`;

function EditableListItem({ initial, submitFn, customCss }) {
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState(initial.name || '');
  const [category, setCategory] = useState(initial.category, '');
  const [location, setLocation] = useState(initial.location, '');
  const quantityState = useState(initial.quantity || 1);
  const [quantity, setQuantity] = quantityState;

  function resetState() {
    setIsValid(true);
    setName('');
    setCategory('');
    setLocation('');
    setQuantity(1);
  }

  async function validateAndSubmit() {
    if (isValid && name && category && location) {
      await submitFn({ name, category, location, quantity });
      resetState();
    } else {
      setIsValid(false);
    }
  }

  return (
    <li css={[listItemStyle(isValid || 'red'), addItemContainer, customCss]}>
      <div css={[addItemRow, { marginBottom: '1rem' }]}>
        <input
          type="text"
          css={addInputStyle}
          value={name}
          placeholder="Item name"
          onChange={(e) => {
            setName(e.target.value);
            setIsValid(true);
          }}
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
            setIsValid(true);
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
            setIsValid(true);
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
        <div css={addSaveStyle} onClick={validateAndSubmit}>
          Save
        </div>
      </div>
    </li>
  );
}

export default EditableListItem;
