import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 64vh;
`;

const Breadcrumb = styled.div`
  margin-bottom: 4rem;
  padding: 1rem;
  color: var(--color-grey-1);

  span {
    color: var(--color-black);
  }
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: var(--color-grey-3);
  margin-bottom: 2rem;
`;

const Message = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-3);
  margin-bottom: 4rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1.5rem 3rem;
  font-size: 1.6rem;
  color: var(--color-white);
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-red-1);
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Breadcrumb>
        Home / <span>404 Error</span>{" "}
      </Breadcrumb>
      <NotFoundContainer>
        <Title>404 Not Found</Title>
        <Message>Your visited page not found. You may go home page.</Message>
        <Button to="/">Back to home page</Button>
      </NotFoundContainer>
    </Container>
  );
};

export default NotFound;
