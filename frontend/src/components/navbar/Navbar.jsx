import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SearchBox from "./SearchBox";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenAdmin, setDropdownOpenAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userIconRef = useRef(null);
  const dropdownRef = useRef(null);
  const userIconRefAdmin = useRef(null);
  const dropdownRefAdmin = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      throw new Error(err);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
    setDropdownOpenAdmin(false);
  };

  const toggleDropdownAdmin = () => {
    setDropdownOpenAdmin((prevState) => !prevState);
    setDropdownOpen(false);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        dropdownOpen &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        dropdownOpenAdmin &&
        userIconRefAdmin.current &&
        !userIconRefAdmin.current.contains(event.target) &&
        dropdownRefAdmin.current &&
        !dropdownRefAdmin.current.contains(event.target)
      ) {
        setDropdownOpenAdmin(false);
      }
    },
    [dropdownOpen, dropdownOpenAdmin]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <NavBar>
      <Container>
        <NavbarContainer>
          <Logo>
            <Link to="/">
              <img src="/logo.png" alt="logo" />
            </Link>
          </Logo>
          <SearchBox />
          <NavIcons
            cartItems={cartItems}
            wishListItems={wishListItems}
            userInfo={userInfo}
            toggleDropdown={toggleDropdown}
            userIconRef={userIconRef}
            dropdownOpen={dropdownOpen}
            dropdownRef={dropdownRef}
            toggleDropdownAdmin={toggleDropdownAdmin}
            userIconRefAdmin={userIconRefAdmin}
            dropdownOpenAdmin={dropdownOpenAdmin}
            dropdownRefAdmin={dropdownRefAdmin}
            logoutHandler={logoutHandler}
          />
          <MenuToggle onClick={toggleMobileMenu}>
            <span />
            <span />
            <span />
          </MenuToggle>
          <NavContent mobileMenuOpen={mobileMenuOpen}>
            <NavLinks closeNav={toggleMobileMenu} />
          </NavContent>
        </NavbarContainer>
      </Container>
    </NavBar>
  );
}

const NavBar = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--color-black);
`;

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 2.5rem 2rem;

  @media (max-width: 768px) {
    margin-top: 8rem;
    padding: 0;
    width: 80%;
  }
`;

const Logo = styled.div`
  padding: 1rem;
  margin-right: auto;

  img {
    width: 3rem;
    object-fit: cover;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  position: absolute;
  right: 3rem;
  span {
    height: 0.2rem;
    width: 2rem;
    background: var(--color-black);
    margin-bottom: 0.4rem;
    border-radius: 0.1rem;
  }

  @media (max-width: 768px) {
    display: flex;
    z-index: 999;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    background-color: var(--color-grey-0);
    z-index: 10;
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
    width: ${({ mobileMenuOpen }) => (mobileMenuOpen ? "100%" : "0")};
    padding: ${({ mobileMenuOpen }) => (mobileMenuOpen ? "8rem" : "0")};
    transform: ${({ mobileMenuOpen }) =>
      mobileMenuOpen ? "translateX(0)" : "translateX(100%)"};
  }
`;

export default Navbar;
