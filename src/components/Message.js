/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const boxStyle = css`
  width: 100%;
  margin: 0rem 1rem;
  padding: 1rem;
  text-align: left;
  font-style: italic;
  background-color: var(--white);
  border-radius: 2rem;
`;

const colorByType = (type) => {
  if (type === 'error') {
    return css`
      color: var(--red);
    `;
  } else {
    return css`
      color: var(--dark-blue);
    `;
  }
};

function Message({ message, type = 'info' }) {
  return (
    <div css={[boxStyle, colorByType(type)]}>
      {type === 'error' && 'Error: '}
      {message}
    </div>
  );
}

export default Message;
