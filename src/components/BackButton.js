/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

import SearchContext from '../context/SearchContext';

const btnStyle = css`
  position: absolute;
  top: 1.5rem;
  left: -1rem;
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--blue);
`;

function BackButton({ customCss, onClick }) {
  const history = useHistory();
  const match = useRouteMatch({ path: '/view/:place', exact: true });
  const [q, setQ] = useContext(SearchContext);

  const smartGoBack = () => {
    if (q && match) {
      setQ('');
      history.replace({ search: '' });
    } else {
      // This will trigger a POP event, and we already have a listener
      // to clear q on POP events
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
