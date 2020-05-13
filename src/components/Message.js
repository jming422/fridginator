/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const boxStyle = css`
  width: 90%;
  padding: 1.5rem;
  font-size: 1.6rem;
  text-align: left;
  font-style: italic;
  background-color: var(--white);
  border-radius: 1rem;
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

function Message({ message, type = 'info', customCss }) {
  return (
    <div css={[boxStyle, colorByType(type), customCss]}>
      {type === 'error' && 'Error: '}
      {`${message}`}
    </div>
  );
}

export default Message;
