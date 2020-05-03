/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import _ from 'lodash';
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { searchContainer } from '../styles/positions';
import { useHistory } from 'react-router-dom';

const searchBarStyle = css`
  width: 80%;
  padding-bottom: 0.5rem;
  margin-bottom: 4rem;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 0.1rem solid var(--blue);
  color: var(--blue);
`;

const searchInputStyle = css`
  margin-left: 0.5rem;
  flex-grow: 1;
  background: transparent;
  border: none;
  color: var(--blue);
  font-size: 2rem;
  font-style: italic;
`;

const throttledChangeFn = _.throttle((history, newValue) => {
  history.replace({ search: `?${qs.stringify({ q: newValue })}` });
}, 250);

function SearchView({ q, children }) {
  const [value, setValue] = useState(q || '');
  const history = useHistory();

  return (
    <div css={searchContainer}>
      <div css={searchBarStyle}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          css={searchInputStyle}
          value={value}
          onChange={(e) => {
            const newVal = e.target.value;
            setValue(newVal);
            throttledChangeFn(history, newVal);
          }}
        />
      </div>
      {children}
    </div>
  );
}

export default SearchView;
