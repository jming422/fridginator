/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useContext, useState } from 'react';
import moment from 'moment/moment';
import _ from 'lodash';
import Fuse from 'fuse.js';

import SearchContext from '../../context/SearchContext';
import { idToName } from '../../utils/categories';

import QuantityPicker from '../../components/QuantityPicker';

const d2 = moment.duration(2, 'weeks');
const d1 = moment.duration(1, 'week');
const d = moment.duration(2, 'days');

const things = [
  { name: 'thing0', quantity: 12, category: 'eggs-dairy', location: 'fridge', duration: d2 },
  { name: 'thing1', quantity: 1, category: 'meats', location: 'fridge', duration: d1 },
  { name: 'thing2', quantity: 2, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing3', quantity: 3, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing4', quantity: 4, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing5', quantity: 5, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing6', quantity: 6, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing7', quantity: 7, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing8', quantity: 8, category: 'desserts', location: 'freezer', duration: d },
  { name: 'thing9', quantity: 9, category: 'meats', location: 'freezer', duration: d },
  { name: 'thing10', quantity: 10, category: 'drinks', location: 'fridge', duration: d },
  { name: 'thing11', quantity: 11, category: 'vegetables', location: 'fridge', duration: d },
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

function SearchList({ place, category }) {
  const [q] = useContext(SearchContext);
  const [qtys, setQtys] = useState(things.map(({ quantity }) => quantity));

  const filteredThings = things.filter((t) => t.location === place && (!category || t.category === category));
  const fuse = new Fuse(filteredThings, { keys: ['name'] });

  const results = q ? fuse.search(q).map(({ item }) => item) : filteredThings;

  return (
    <ul css={listStyle}>
      {results.map((item, i) => {
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
  );
}

export default SearchList;
