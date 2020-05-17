/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { flexCenter } from '../styles/positions';

const fabStyle = css`
  position: fixed;
  right: 1rem;
  bottom: 3rem;
  height: 6rem;
  width: 6rem;
  border-radius: 3rem;
  font-size: 2rem;
  ${flexCenter}
  cursor: pointer;
  background-color: var(--dark-blue);
  color: var(--white);
`;

function FAB({ icon = faPlus, customCss, onClick = () => {} }) {
  return (
    <div css={[fabStyle, customCss]} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default FAB;
