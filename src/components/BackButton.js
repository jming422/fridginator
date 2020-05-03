/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';

const btnStyle = css`
  position: absolute;
  top: 2rem;
  left: 0rem;
  font-size: 2rem;
  cursor: pointer;
  color: var(--blue);
`;

function BackButton({ customCss, onClick }) {
  const history = useHistory();
  const location = useLocation();

  const smartGoBack = () => {
    if (location.search && location.search !== '?q=') {
      history.replace({ search: '' });
    } else {
      history.goBack();
    }
  };

  const clickFn = onClick || smartGoBack;

  return (
    <div css={[btnStyle, customCss]} onClick={clickFn}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
}

export default BackButton;
