import { css } from '@emotion/core';

export const listStyle = css`
  height: 100%;
  width: 100%;
  max-width: 70rem;
  padding: 0;
`;

export const listItemStyle = (status) => {
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
    transition: border-color 0.75s;
    margin: 2rem 0rem;
    padding: 1rem;
    background-color: var(--white);
    color: var(--gray);
    border: 0.25rem solid;
    border-color: var(${borderColor});
    border-radius: 1rem;
    font-size: 1.8rem;
  `;
};

export const itemNameStyle = css`
  color: var(--black);
  font-weight: bold;
  flex-grow: 1;
`;
