import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavLinksDropdown = ({ dropdownRef }) => {
  const location = useLocation();

  return (
    <DropdownMenu ref={dropdownRef}>
      {location.pathname !== "/" && (
        <li>
          <DropdownItemLink to="/">Home</DropdownItemLink>
        </li>
      )}
      {location.pathname !== "/contact" && (
        <li>
          <DropdownItemLink to="/contact">Contact</DropdownItemLink>
        </li>
      )}
      {location.pathname !== "/about" && (
        <li>
          <DropdownItemLink to="/about">About</DropdownItemLink>
        </li>
      )}
      {location.pathname !== "/products" && (
        <li>
          <DropdownItemLink to="/products">Shop</DropdownItemLink>
        </li>
      )}
    </DropdownMenu>
  );
};

const DropdownMenu = styled.ul`
  position: absolute;
  top: 4rem;
  right: 0;
  background-color: #808e9b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 20rem;
`;

const DropdownItemLink = styled(Link)`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-1);
    color: var(--color-white);
  }
`;

export default NavLinksDropdown;
