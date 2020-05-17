/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FREEZER_CATEGORIES, FRIDGE_CATEGORIES, PANTRY_CATEGORIES } from '../../utils/categories';

const gridContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: -1rem 2rem 0rem 2rem;
  padding: 0;
`;

const cardStyle = css`
  width: 30rem;
  height: 8rem;
  margin: 2rem;
  padding: 0rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  border-radius: 1rem;
  background-color: var(--white);
  color: var(--blue);
  font-size: 2.8rem;
`;

function Card({ icon, title, linkTo }) {
  return (
    <Link to={linkTo} css={cardStyle}>
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
    case 'pantry':
      categories = PANTRY_CATEGORIES;
      break;
    default:
      categories = [];
  }

  return (
    <div css={gridContainer}>
      {categories.map((c, i) => (
        <Card key={i} icon={c.icon} title={c.name} linkTo={`${match.url}/${c.id}`} />
      ))}
    </div>
  );
}

export default Categories;
