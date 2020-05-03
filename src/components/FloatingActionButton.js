/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const fabStyle = css`
  position: absolute;
  right: 6rem;
  bottom: 6rem;
  height: 6rem;
  width: 6rem;
  border-radius: 3rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-blue);
  color: var(--white);
  cursor: pointer;
`;

function FAB({ icon = faPlus, onClick = () => {} }) {
  return (
    <div css={fabStyle} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default FAB;
