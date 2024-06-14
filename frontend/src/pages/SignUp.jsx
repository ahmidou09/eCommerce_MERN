import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useRegisterMutation } from "../redux/slices/usersApiSlice";
import Loading from "../components/ui/Loading";
import { toast } from "react-toastify";
import FormFields from "../components/ui/FormFields";

const SignUp = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formFields.password !== formFields.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({
        name: formFields.name,
        email: formFields.email,
        password: formFields.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const fields = [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      required: true,
    },
    {
      id: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      required: true,
    },
  ];

  return (
    <Container>
      <SignUpContainer>
        <ImageContainer>
          <SVGImage src="/loginImage.svg" alt="SignUp Illustration" />
        </ImageContainer>
        <SignUpFormContainer>
          <Title>Sign Up to Exclusive</Title>

          <Form onSubmit={submitHandler}>
            <FormFields
              fields={fields}
              formFields={formFields}
              handleInputChange={handleInputChange}
            />
            {isLoading ? <Loading /> : <Button type="submit">Sign Up</Button>}
          </Form>
          <AlreadyHaveAccount>
            Already have an account?
            <LoginLink to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Log in here
            </LoginLink>
          </AlreadyHaveAccount>
        </SignUpFormContainer>
      </SignUpContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 85vh;
`;

const SignUpContainer = styled.div`
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

const SignUpFormContainer = styled.div`
  flex: 1;
  max-width: 50rem;
  padding: 4rem;
  background-color: var(--color-white);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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

const AlreadyHaveAccount = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-3);
`;

const LoginLink = styled(Link)`
  color: var(--color-primary-1);
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default SignUp;
