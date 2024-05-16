import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 2rem;
  background-color: var(--color-primary-1);
  color: var(--color-white);

  font-size: 1.2rem;
`;

function Footer() {
  const date = new Date().getFullYear();
  return <FooterContainer>&copy; {date} all rights reserved</FooterContainer>;
}

export default Footer;
