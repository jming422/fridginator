/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Truncate from 'react-truncate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

import QuantityPicker from './QuantityPicker';

import { idToName } from '../utils/categories';

export const listStyle = css`
  height: 100%;
  width: 100%;
  max-width: 70rem;
  margin-top: -1rem;
  padding: 0;
`;

const listItemContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  text-align: left;
`;

export const listItemStyle = (status) => {
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

export const itemNameStyle = css`
  color: var(--black);
  font-weight: bold;
  flex-grow: 1;
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

export function ItemListChildren({ items }) {
  return items.map(({ name, quantity, location, category, duration }, i) => {
    let status = 'normal';
    if (duration && duration.asWeeks() >= 2) status = 'red';
    else if (duration && duration.asWeeks() >= 1) status = 'orange';

    let locationIcon;
    if (location === 'fridge') locationIcon = faTint;
    else if (location === 'freezer') locationIcon = faSnowflake;

    return (
      <li key={i} css={[listItemStyle(status), listItemContainer]}>
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
  });
}

function ItemList({ items }) {
  return (
    <ul css={listStyle}>
      <ItemListChildren items={items} />
    </ul>
  );
}

export default ItemList;
