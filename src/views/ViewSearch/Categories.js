/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faTint } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

import { FREEZER_CATEGORIES, FRIDGE_CATEGORIES, PANTRY_CATEGORIES } from '../../utils/categories';

const gridContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 2rem 2rem 0rem 2rem;
  padding: 0;
`;

const cardStyle = css`
  width: 30rem;
  height: 8rem;
  margin: 1rem;
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

function Card({ icon, title, linkTo, customCss }) {
  return (
    <Link to={linkTo} css={[cardStyle, customCss]}>
      <FontAwesomeIcon icon={icon} />
      <div css={{ marginLeft: '2rem' }}>{title}</div>
    </Link>
  );
}

function Categories() {
  const match = useRouteMatch('/view/:place');
  const place = match.params.place;

  let categories;
  let placeIcon;
  switch (place) {
    case 'fridge':
      categories = FRIDGE_CATEGORIES;
      placeIcon = faTint;
      break;
    case 'freezer':
      categories = FREEZER_CATEGORIES;
      placeIcon = faSnowflake;
      break;
    case 'pantry':
      categories = PANTRY_CATEGORIES;
      placeIcon = faDoorClosed;
      break;
    default:
      categories = [];
  }

  return (
    <div css={gridContainer}>
      <Card
        key="all"
        icon={placeIcon}
        title="Everything"
        linkTo={`${match.url}/all`}
        customCss={{ fontStyle: 'italic' }}
      />
      {categories.map((c) => (
        <Card key={c.id} icon={c.icon} title={c.name} linkTo={`${match.url}/${c.id}`} />
      ))}
    </div>
  );
}

export default Categories;
