import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import useIsMobile from "../../hooks/useIsMobile";
import SearchBox from "./SearchBox";

function Navbar() {
  const isMobile = useIsMobile();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenNavLinks, setDropdownOpenNavLinks] = useState(false);
  const [dropdownOpenAdmin, setDropdownOpenAdmin] = useState(false);
  const userIconRef = useRef(null);
  const dropdownRef = useRef(null);
  const userIconRefAdmin = useRef(null);
  const dropdownRefAdmin = useRef(null);
  const navLinksIconRef = useRef(null);
  const dropdownRefNavLinks = useRef(null);
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
    setDropdownOpenNavLinks(false);
    setDropdownOpenAdmin(false);
  };

  const toggleDropdownAdmin = () => {
    setDropdownOpenAdmin((prevState) => !prevState);
    setDropdownOpenNavLinks(false);
    setDropdownOpen(false);
  };

  const toggleDropdownNavLinks = () => {
    setDropdownOpenNavLinks((prevState) => !prevState);
    setDropdownOpenAdmin(false);
    setDropdownOpen(false);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        dropdownOpenNavLinks &&
        navLinksIconRef.current &&
        !navLinksIconRef.current.contains(event.target) &&
        dropdownRefNavLinks.current &&
        !dropdownRefNavLinks.current.contains(event.target)
      ) {
        setDropdownOpenNavLinks(false);
      }
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
    [dropdownOpen, dropdownOpenAdmin, dropdownOpenNavLinks]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <NavBar>
      <Container>
        <NavbarContainer>
          <Logo>
            <Link to="/">
              <img src="/logo.png" alt="logo" />
            </Link>
          </Logo>
          {!isMobile && <NavLinks />}
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
            navLinksIconRef={navLinksIconRef}
            dropdownRefNavLinks={dropdownRefNavLinks}
            toggleDropdownNavLinks={toggleDropdownNavLinks}
            dropdownOpenNavLinks={dropdownOpenNavLinks}
          />
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

  @media (max-width: 500px) {
    margin-top: 8rem;
    margin-bottom: 1rem;
    padding: 0 2rem;
  }
`;

const Logo = styled.div`
  padding: 1rem;
  margin-right: auto;

  @media (max-width: 560px) {
    padding: 0;
  }

  img {
    width: 3rem;
    object-fit: cover;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export default Navbar;
