/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { centerRow } from '../../styles/positions';

import { FREEZER_CATEGORIES, FRIDGE_CATEGORIES } from '../../utils/categories';

const gridContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: -2rem;
`;

const cardStyle = css`
  height: 18rem;
  width: 30rem;
  margin: 2rem;
  border-radius: 1rem;
  background-color: var(--white);
  color: var(--blue);
  font-size: 3rem;
  ${centerRow}
`;

function Card({ icon, title, linkTo }) {
  return (
    <Link to={linkTo} css={[cardStyle]}>
      <FontAwesomeIcon icon={icon} />
      <div css={{ marginLeft: '2rem' }}>{title}</div>
    </Link>
  );
}

function Categories() {
  const match = useRouteMatch('/view/:place');
  const place = match.params.place;
  let categories;
  switch (place) {
    case 'fridge':
      categories = FRIDGE_CATEGORIES;
      break;
    case 'freezer':
      categories = FREEZER_CATEGORIES;
      break;
    default:
      categories = [];
  }

  return (
    <div css={gridContainer}>
      {categories.map((c, i) => (
        <Card key={i} icon={c.icon} title={c.name} linkTo={`${match.url}/${c.path}`} />
      ))}
    </div>
  );
}

export default Categories;
