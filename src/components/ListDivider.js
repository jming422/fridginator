/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const dividerContainer = css`
  margin: 0rem 2rem;
`;

const topDividerStyle = css`
  height: 1rem;
  border-bottom: 0.25rem solid var(--dark-blue);
`;

const bottomDividerStyle = css`
  height: 1rem;
`;

export default function() {
  return (
    <div css={[dividerContainer]}>
      <div css={topDividerStyle} />
      <div css={bottomDividerStyle} />
    </div>
  );
}
