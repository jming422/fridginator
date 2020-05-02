import { css, keyframes } from "@emotion/core";

const pulsateKF = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

export const pulsateLoading = css`
  animation: ${pulsateKF} 2s ease-out;
  animation-iteration-count: infinite;
  opacity: 1;
`;

const fadeKF = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeIn = css`
  animation: ${fadeKF} 500ms ease-out;
  animation-iteration-count: 1;
  opacity: 1;
`;

const zoomPulseKF = keyframes`
  0% {
    transform: scale(0.2);
    opacity: 0.2;
  }
  75% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const zoomKF = keyframes`
  0% {
    transform: scale(0.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const zoomPulseFrom = transformOrigin => css`
  ${transformOrigin ? `transform-origin: ${transformOrigin};` : ""}
  animation: ${zoomPulseKF} 128ms ease-in;
  animation-iteration-count: 1;
  scale: 1;
  opacity: 1;
`;

export const zoomFrom = transformOrigin => css`
  ${transformOrigin ? `transform-origin: ${transformOrigin};` : ""}
  animation: ${zoomKF} 99ms ease-out;
  animation-iteration-count: 1;
  scale: 1;
  opacity: 1;
`;
