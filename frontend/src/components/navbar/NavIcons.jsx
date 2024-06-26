import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import UserDropdown from "./UserDropdown";
import AdminDropdown from "./AdminDropdown";

const NavIcons = ({
  cartItems,
  wishListItems,
  userInfo,
  toggleDropdown,
  userIconRef,
  dropdownOpen,
  dropdownRef,
  toggleDropdownAdmin,
  userIconRefAdmin,
  dropdownOpenAdmin,
  dropdownRefAdmin,
  logoutHandler,
}) => (
  <NavIconsContainer>
    <IconContainer className="order">
      <Link to="/wishList">
        {wishListItems.length > 0 && (
          <IconCount>{wishListItems.length}</IconCount>
        )}
        <FaRegHeart />
      </Link>
    </IconContainer>
    <IconContainer className="order margin">
      <Link to="/cart">
        {cartItems.length > 0 && <IconCount>{cartItems.length}</IconCount>}
        <AiOutlineShoppingCart />
      </Link>
    </IconContainer>

    {userInfo ? (
      <>
        <NameOfUser>{userInfo.name}</NameOfUser>
        <UserIcon ref={userIconRef} onClick={toggleDropdown}>
          <FaRegUser />
          {dropdownOpen && (
            <UserDropdown
              dropdownRef={dropdownRef}
              logoutHandler={logoutHandler}
            />
          )}
        </UserIcon>
      </>
    ) : (
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    )}

    {userInfo && userInfo.isAdmin && (
      <UserIcon ref={userIconRefAdmin} onClick={toggleDropdownAdmin}>
        <MdAdminPanelSettings />
        {dropdownOpenAdmin && (
          <AdminDropdown dropdownRefAdmin={dropdownRefAdmin} />
        )}
      </UserIcon>
    )}
  </NavIconsContainer>
);

const NavIconsContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 10;
  order: 1;
  .order {
    @media (max-width: 768px) {
      order: -1;
    }
  }

  .margin {
    margin-right: 0;

    @media (max-width: 768px) {
      margin-right: auto;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    gap: 2rem;
    width: 100%;
    padding: 0 3rem 0 1.25rem;
  }
`;

const IconContainer = styled.li`
  position: relative;
  cursor: pointer;
`;

const IconCount = styled.span`
  position: absolute;
  top: -0.9rem;
  right: -0.9rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  padding: 0.5rem;
  background-color: var(--color-primary-1);
  font-size: 1.2rem;
`;

const UserIcon = styled(IconContainer)`
  background-color: var(--color-primary-1);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-4px);
  svg {
    color: var(--color-white);
    font-size: 1.6rem;
  }
`;

const NameOfUser = styled.span`
  display: block;
  font-size: 1.4rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default NavIcons;
