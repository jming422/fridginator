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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4rem;
`;

const searchBarStyle = css`
  height: 4.5rem;
  width: 75%;
  position: absolute;
  top: 0;
  padding-bottom: 0.5rem;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  border-bottom: 0.1rem solid var(--blue);
  color: var(--blue);
  z-index: 1;
`;

const searchInputStyle = css`
  margin-left: 0.5rem;
  width: 100%;
  background: transparent;
  border: none;
  color: var(--dark-blue);
  font-size: 2rem;
  font-style: italic;
`;

const searchClearStyle = css`
  font-size: 2.4rem;
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
        <div css={{ marginBottom: '0.2rem' }}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="search"
          css={searchInputStyle}
          value={q}
          onChange={(e) => {
            const newVal = e.target.value;
            setQ(newVal);
            throttledChangeFn(history, newVal);
          }}
        />
        <div
          css={searchClearStyle}
          onClick={() => {
            setQ('');
            throttledChangeFn(history, '');
          }}
        >
          &times;
        </div>
      </div>
      {children}
    </div>
  );
}

export default SearchView;
