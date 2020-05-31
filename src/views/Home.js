/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react'; // eslint-disable-line
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faTint, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

import { flexCenter, container } from '../styles/positions';
import SearchContext from '../context/SearchContext';

import FAB from '../components/FloatingActionButton';
import AddableItemList from '../components/AddableItemList';
import SearchView from '../components/SearchView';

const homeContainer = css`
  padding: 0;
  margin-top: 1rem;
`;

const homeCardStyle = css`
  height: 25vh;
  width: 100%;
  max-width: 40rem;
  border-radius: 3rem;
  margin-top: 2rem;
  font-size: 4rem;
  cursor: pointer;
  ${flexCenter}
  flex-direction: row;
`;

const freezerStyle = css`
  background-color: var(--light-blue);
  color: var(--dark-blue);
`;

const fridgeStyle = css`
  background-color: var(--blue);
  color: var(--white);
`;

const pantryStyle = css`
  background-color: var(--dark-blue);
  color: var(--light-blue);
`;

function HomeCard({ title, customCss, icon, linkTo }) {
  return (
    <Link to={linkTo} css={[homeCardStyle, customCss]}>
      <FontAwesomeIcon icon={icon} />
      <div css={{ marginLeft: '2rem' }}>{title}</div>
    </Link>
  );
}

function Home() {
  const [q] = useContext(SearchContext);

  return (
    <SearchView>
      {q ? (
        <AddableItemList />
      ) : (
        <div css={[container, homeContainer]}>
          <HomeCard title="Freezer" customCss={freezerStyle} icon={faSnowflake} linkTo="/view/freezer" />
          <HomeCard title="Fridge" customCss={fridgeStyle} icon={faTint} linkTo="/view/fridge" />
          <HomeCard title="Pantry" customCss={pantryStyle} icon={faDoorClosed} linkTo="/view/pantry" />
          <Link to="/add">
            <FAB icon={faShoppingCart} />
          </Link>
        </div>
      )}
    </SearchView>
  );
}

export default Home;
