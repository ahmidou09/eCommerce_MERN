import React from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FooterContainer = styled.footer`
  background-color: var(--color-primary-3);
  color: var(--color-white);
  padding: 2rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  margin: 1rem;
  min-width: 20rem;
  .paragraph {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
`;

const ExternalLink = styled(Link)`
  color: var(--color-white);
  text-decoration: none;
  display: block;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const InternalLink = styled(Link)`
  color: var(--color-white);
  text-decoration: none;
  display: block;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover::after {
    content: "Coming Soon";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--color-white);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    white-space: nowrap;
  }
`;

const Img = styled.img`
  width: 16rem;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
`;

const SubscribeInput = styled.input`
  padding: 1rem;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  background-color: var(--color-primary-3);
  border: 0.1rem solid var(--color-grey-4);
  margin-right: -3rem;

  &::placeholder {
    color: var(--color-grey-4);
  }
`;

const SubscribeButton = styled.button`
  background-color: transparent;
  color: var(--color-white);
  border: none;
  transform: translateY(-0.5rem);
  cursor: pointer;

  svg {
    font-size: 2.2rem;
  }
`;

const SocialIcons = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    color: var(--color-white);
    font-size: 2rem;
    transition: all 0.3s;
    cursor: pointer;

    &:hover svg {
      color: var(--color-primary-1);
    }
  }

  svg {
    font-size: 2rem;
  }
`;

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <FooterContainer>
      <Column>
        <Title>Exclusive</Title>
        <p className="paragraph">Get 10% off your first order</p>
        <FormContainer>
          <SubscribeInput type="email" placeholder="Enter your email" />
          <SubscribeButton type="submit">
            <VscSend />
          </SubscribeButton>
        </FormContainer>
      </Column>
      <Column>
        <Title>Support</Title>
        <p className="paragraph">
          111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
        </p>
        <ExternalLink to="mailto:exclusive@gmail.com">
          exclusive@gmail.com
        </ExternalLink>
        <p>+88015-88888-9999</p>
      </Column>
      <Column>
        <Title>Account</Title>
        {userInfo && (
          <InternalLink to="account/my-profile">My Account</InternalLink>
        )}
        <InternalLink to="/login">Login / Register</InternalLink>
        <InternalLink to="/cart">Cart</InternalLink>
        <InternalLink to="/wishlist">Wishlist</InternalLink>
        <InternalLink to="/products">Shop</InternalLink>
      </Column>
      <Column>
        <Title>Quick Link</Title>
        <InternalLink to="/privacy-policy">Privacy Policy</InternalLink>
        <InternalLink to="/terms-of-use">Terms Of Use</InternalLink>
        <InternalLink to="/faq">FAQ</InternalLink>
        <InternalLink to="/contact">Contact</InternalLink>
      </Column>
      <Column>
        <Title>Download App</Title>
        <p className="paragraph">Save $3 with App New User Only</p>
        <ImgContainer>
          <Img src="/app.png" alt="App Store" loading="lazy" />
        </ImgContainer>
        <SocialIcons>
          <Link to="https://www.facebook.com/" rel="noreferrer" target="_blank">
            <FaFacebookF />
          </Link>
          <Link to="https://www.x.com/" rel="noreferrer" target="_blank">
            <FaTwitter />
          </Link>
          <Link
            to="https://www.instagram.com/"
            rel="noreferrer"
            target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link to="https://www.linkedin.com/" rel="noreferrer" target="_blank">
            <FaLinkedinIn />
          </Link>
        </SocialIcons>
      </Column>
    </FooterContainer>
  );
};

export default Footer;
