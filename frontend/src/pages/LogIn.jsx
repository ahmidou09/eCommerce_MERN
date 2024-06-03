import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 85vh;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 5rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const SVGImage = styled.img`
  width: 100%;
`;

const LoginFormContainer = styled.div`
  flex: 1;
  max-width: 50rem;
  padding: 4rem;
  background-color: var(--color-white);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.4rem;
  color: var(--color-grey-3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 2rem;
  padding: 1.5rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-4);
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 1.5rem;
  font-size: 1.6rem;
  color: var(--color-white);
  background-color: var(--color-primary-1);
  border: none;
  margin-bottom: 2rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-red-1);
  }
`;

const ForgotPassword = styled.a`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-primary-1);
  text-align: right;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  return (
    <Container>
      <LoginContainer>
        <ImageContainer>
          <SVGImage src="/loginImage.svg" alt="Login Illustration" />
        </ImageContainer>
        <LoginFormContainer>
          <Title>Log in to Exclusive</Title>
          <Form>
            <Input type="text" placeholder="Email or Phone Number" />
            <Input type="password" placeholder="Password" />
            <Button type="submit">Log In</Button>
          </Form>
          <ForgotPassword href="#">Forget Password?</ForgotPassword>
        </LoginFormContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
