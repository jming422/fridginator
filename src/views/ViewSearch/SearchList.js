/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useContext } from 'react';
import Fuse from 'fuse.js';

import SearchContext from '../../context/SearchContext';
import ItemsListContext from '../../context/ItemsListContext';
import { idToName } from '../../utils/categories';

import QuantityPicker from '../../components/QuantityPicker';

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

function SearchList({ place, category }) {
  const [items /*, refresh */] = useContext(ItemsListContext);
  const [q] = useContext(SearchContext);

  const filteredItems = items.filter((t) => t.location === place && (!category || t.category === category));
  const fuse = new Fuse(filteredItems, { keys: ['name'] });

  const results = q ? fuse.search(q).map(({ item }) => item) : filteredItems;

  return (
    <ul css={listStyle}>
      {results.map(({ name, quantity, location, category, duration }, i) => {
        let status = 'normal';
        if (duration && duration.asWeeks() >= 2) status = 'red';
        else if (duration && duration.asWeeks() >= 1) status = 'orange';

        return (
          <li key={i} css={listItemStyle(status)}>
            <div css={itemNameStyle}>{name}</div>
            <div>{idToName(category)}</div>
            <div css={{ textTransform: 'capitalize' }}>
              {location} {duration && `(${duration.humanize()})`}
            </div>
            <QuantityPicker
              initial={quantity}
              onChange={(newQty) => {
                console.log(`server update ${newQty}`);
                // refresh();
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default SearchList;
