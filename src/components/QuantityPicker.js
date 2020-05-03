/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { centerRow } from '../styles/positions';

const pickerStyle = css`
  ${centerRow}
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
  margin: 0rem 1rem;
  text-align: center;
  background: transparent;
  border: none;
  color: var(--black);
  font-size: 2rem;
`;

const throttledChangeFn = _.throttle((fn, val) => fn(val), 250);

function QuantityPicker({ quantity, onChange = () => {} }) {
  const [qtyState, setQtyState] = useState(quantity || 0);

  return (
    <div css={pickerStyle}>
      <div
        css={minusIconStyle}
        onClick={() => {
          setQtyState((oldVal) => {
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
        value={qtyState}
        onChange={(e) => {
          const newVal = e.target.value;
          throttledChangeFn(onChange, newVal);
          setQtyState(newVal);
        }}
      />
      <div
        css={plusIconStyle}
        onClick={() => {
          setQtyState((oldVal) => {
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
