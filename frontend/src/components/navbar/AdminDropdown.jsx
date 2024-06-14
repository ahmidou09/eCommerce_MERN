import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaUsers } from "react-icons/fa";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { TbShoppingCartCog } from "react-icons/tb";

const AdminDropdown = ({ dropdownRefAdmin }) => (
  <DropdownMenu ref={dropdownRefAdmin}>
    <li>
      <DropdownItemLink to="/admin/users">
        <FaUsers />
        List Users
      </DropdownItemLink>
    </li>
    <li>
      <DropdownItemLink to="/admin/orders">
        <HiMiniClipboardDocumentList />
        List Orders
      </DropdownItemLink>
    </li>
    <li>
      <DropdownItemLink to="/admin/products">
        <TbShoppingCartCog />
        List Products
      </DropdownItemLink>
    </li>
  </DropdownMenu>
);

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
  color: var(--color-black);
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-1);
    color: var(--color-white);
  }

  svg {
    font-size: 1.4rem;
  }
`;

export default AdminDropdown;
