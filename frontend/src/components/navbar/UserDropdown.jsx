import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import { ImCancelCircle } from "react-icons/im";
import { FaRegStar } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

const UserDropdown = ({ dropdownRef, logoutHandler }) => (
  <DropdownMenu ref={dropdownRef}>
    <li>
      <DropdownItemLink to="/account/profile">
        <FaRegUser />
        Manage My Account
      </DropdownItemLink>
    </li>
    <li>
      <DropdownItemLink to="/orders">
        <CgShoppingBag />
        My Order
      </DropdownItemLink>
    </li>
    <li>
      <DropdownItemLink to="/cancellations">
        <ImCancelCircle />
        My Cancellations
      </DropdownItemLink>
    </li>
    <li>
      <DropdownItemLink to="/myreviews">
        <FaRegStar />
        My Reviews
      </DropdownItemLink>
    </li>
    <li>
      <DropdownItemLink onClick={logoutHandler}>
        <RiLogoutBoxLine />
        Logout
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

export default UserDropdown;
