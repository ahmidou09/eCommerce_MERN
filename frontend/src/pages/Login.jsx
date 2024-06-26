import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";
import FormFields from "../components/ui/FormFields";
import Meta from "../components/ui/Meta";

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: formFields.email,
        password: formFields.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const fields = [
    {
      id: "email",
      type: "text",
      label: "Email",
      required: true,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      required: true,
    },
  ];

  return (
    <Container>
      <Meta title="Login" />
      <LoginContainer>
        <ImageContainer>
          <SVGImage src="/loginImage.svg" alt="Login Illustration" />
        </ImageContainer>
        <LoginFormContainer>
          <Title>Log in to Exclusive</Title>
          <Form onSubmit={handleSubmit}>
            <FormFields
              fields={fields}
              formFields={formFields}
              handleInputChange={handleInputChange}
            />
            <Button disabled={isLoading} type="submit">
              Log In
            </Button>
            {isLoading && <Loading />}
          </Form>
          <LoginForgotPassword>
            <Link to={"forgotpassword"}>Forget Password?</Link>
          </LoginForgotPassword>
          <LoginForgotPassword>
            Don't have an account?{" "}
            <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
              Sign Up
            </Link>
          </LoginForgotPassword>
        </LoginFormContainer>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 65vh;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 5rem;
  font-size: 2.4rem;
  color: var(--color-grey-3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const LoginForgotPassword = styled.div`
  margin-bottom: 1rem;
  a {
    margin-top: 1rem;
    font-size: 1.4rem;
    color: var(--color-primary-1);
    text-align: right;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Login;
