import React from "react";
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
  font-size: 3rem;
  color: var(--color-primary);
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background-color: var(--color-background);
`;

function Loading({ height }) {
  return (
    <LoadingContainer style={{ height: height }}>
      <Spinner />
    </LoadingContainer>
  );
}

export default Loading;
