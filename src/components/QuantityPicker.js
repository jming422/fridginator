/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const pickerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 12%;
  height: 100%;
`;

const iconStyle = css`
  height: 100%;
  font-size: 1.6rem;
  cursor: pointer;
`;

const plusIconStyle = css`
  ${iconStyle}
  color: var(--blue);
`;

const minusIconStyle = css`
  ${iconStyle}
  color: var(--red);
`;

const inputStyle = css`
  max-width: 2.2rem;
  text-align: center;
  background: transparent;
  border: none;
  color: var(--black);
  font-size: 2rem;
`;

const throttledChangeFn = _.throttle((fn, val) => fn(val), 250);

function QuantityPicker({ qty, setQty, onChange = () => {} }) {
  return (
    <div css={pickerStyle}>
      <div
        css={minusIconStyle}
        onClick={() => {
          setQty((oldVal) => {
            const newVal = oldVal - 1;
            if (newVal <= 0) {
              return 0;
            }
            throttledChangeFn(onChange, newVal);
            return newVal;
          });
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </div>
      <input
        type="text"
        css={inputStyle}
        value={qty}
        onClick={(e) => e.target.select()}
        onChange={(e) => {
          const newVal = e.target.value;
          throttledChangeFn(onChange, newVal);
          setQty(newVal);
        }}
      />
      <div
        css={plusIconStyle}
        onClick={() => {
          setQty((oldVal) => {
            const newVal = oldVal + 1;
            if (newVal <= 0) {
              return 0;
            }
            throttledChangeFn(onChange, newVal);
            return newVal;
          });
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}

export default QuantityPicker;
