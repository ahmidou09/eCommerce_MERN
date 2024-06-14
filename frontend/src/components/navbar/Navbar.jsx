import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";


function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenAdmin, setDropdownOpenAdmin] = useState(false);
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

  return (
    <NavBar>
      <Container>
        <NavbarContainer>
          <Logo>
            <Link to="/">
              <span>eCommerceShop</span>
            </Link>
          </Logo>
          <NavLinks />
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
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
`;

const Logo = styled.div`
  span {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export default Navbar;
