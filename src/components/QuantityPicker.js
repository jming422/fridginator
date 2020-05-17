/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { flexCenter } from '../styles/positions';

const pickerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 8rem;
`;

const iconStyle = css`
  height: 100%;
  ${flexCenter}
  font-size: 2rem;
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

const inputBoxStyle = css`
  border-bottom: 0.1rem solid var(--blue);
  color: var(--blue);
`;

const inputStyle = css`
  max-width: 2.2rem;
  text-align: center;
  background: transparent;
  border: none;
  color: var(--dark-blue);
  font-size: 2rem;
`;

function QuantityPicker({ initial, customState, disabled, onChange = () => {} }) {
  const builtinState = useState(initial);

  const [qty, setQty] = customState || builtinState;

  return (
    <div css={pickerStyle}>
      <div
        css={minusIconStyle}
        onClick={() => {
          if (disabled) return;
          setQty((oldVal) => {
            const newVal = oldVal - 1;
            if (newVal < 0) {
              return 0;
            }
            onChange(newVal);
            return newVal;
          });
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </div>
      <div css={inputBoxStyle}>
        <input
          type="text"
          css={inputStyle}
          disabled={disabled}
          value={qty}
          onClick={(e) => e.target.select()}
          onChange={(e) => {
            let newVal = e.target.value;
            if (newVal < 0) {
              newVal = 0;
            }
            onChange(newVal);
            setQty(newVal);
          }}
        />
      </div>
      <div
        css={plusIconStyle}
        onClick={() => {
          if (disabled) return;
          setQty((oldVal) => {
            const newVal = oldVal + 1;
            if (newVal < 0) {
              return 0;
            }
            onChange(newVal);
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
