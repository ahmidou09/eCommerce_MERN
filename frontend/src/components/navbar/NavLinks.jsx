import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLinks = ({ closeNav }) => (
  <NavLinksContainer>
    <li>
      <Link to="/" onClick={closeNav}>
        Home
      </Link>
    </li>
    <li>
      <Link to="/contact" onClick={closeNav}>Contact</Link>
    </li>
    <li>
      <Link to="/about" onClick={closeNav}>About</Link>
    </li>
  </NavLinksContainer>
);

const NavLinksContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: var(--color-black);
    font-size: 1.6rem;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--color-primary-1);
    }
  }
`;

export default NavLinks;
