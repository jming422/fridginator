/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useContext, useState } from 'react';
import moment from 'moment/moment';
import _ from 'lodash';

import SearchContext from '../../context/SearchContext';

import QuantityPicker from '../../components/QuantityPicker';

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

function SearchList({ place, category }) {
  const [q] = useContext(SearchContext);
  const [qtys, setQtys] = useState(things.map(({ quantity }) => quantity));

  return (
    <ul css={listStyle}>
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
  );
}

export default SearchList;
