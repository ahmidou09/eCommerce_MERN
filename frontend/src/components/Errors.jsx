import React from "react";
import styled, { keyframes } from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  width: 100rem;
  margin: 5rem auto;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--color-grey-0);
  color: var(--color-red-1);
  border: 1px solid var(--color-red-1);
  border-radius: 5px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ErrorIcon = styled(FaExclamationTriangle)`
  font-size: 3.2rem;
  margin-right: 1.5rem;
  transform: translateY(-5px);
`;

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  margin: 0;
`;

function Errors({ message, style }) {
  return (
    <ErrorAlert style={style}>
      <ErrorIcon />
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorAlert>
  );
}

export default Errors;
