/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/core';
import React from 'react'; // eslint-disable-line
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

import FAB from '../../components/FloatingActionButton';
import { centerRow, container } from '../../styles/positions';
import { Link } from 'react-router-dom';

const homeCardStyle = css`
  height: 30%;
  width: 100%;
  max-width: 40rem;
  border-radius: 3rem;
  margin: 2rem 0rem;
  font-size: 4rem;
  cursor: pointer;
  ${centerRow}
`;

const freezerStyle = css`
  background-color: var(--light-blue);
  color: var(--dark-blue);
`;

const fridgeStyle = css`
  background-color: var(--blue);
  color: var(--white);
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
  return (
    <div css={container}>
      <HomeCard title="Freezer" customCss={freezerStyle} icon={faSnowflake} linkTo="/view/freezer" />
      <HomeCard title="Fridge" customCss={fridgeStyle} icon={faTint} linkTo="/view/fridge" />
      <Link to="/add">
        <FAB icon={faShoppingCart} />
      </Link>
    </div>
  );
}

export default Home;
