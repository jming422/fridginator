/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import SearchContext from '../context/SearchContext';

const searchContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2rem;
`;

const searchBarStyle = css`
  width: 75%;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
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
  color: var(--dark-blue);
  font-size: 2rem;
  font-style: italic;
`;

const throttledChangeFn = _.throttle((history, newValue) => {
  history.replace({ search: `?${qs.stringify({ q: newValue })}` });
}, 250);

function SearchView({ children }) {
  const history = useHistory();
  const [q, setQ] = useContext(SearchContext);

  return (
    <div css={searchContainer}>
      <div css={searchBarStyle}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          css={searchInputStyle}
          value={q}
          onChange={(e) => {
            const newVal = e.target.value;
            setQ(newVal);
            throttledChangeFn(history, newVal);
          }}
        />
      </div>
      {children}
    </div>
  );
}

export default SearchView;
