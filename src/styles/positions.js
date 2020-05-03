import { css } from '@emotion/core';

export const centerColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const centerRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const container = css`
  height: 100%;
  width: 100%;
  ${centerColumn}
`;
