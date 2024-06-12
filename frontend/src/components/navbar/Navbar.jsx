import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { ImCancelCircle } from "react-icons/im";
import { FaRegStar } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userIconRef = useRef(null);
  const dropdownRef = useRef(null);

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
    setDropdownOpen(!dropdownOpen);
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
    },
    [dropdownOpen]
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
          <NavLinks>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </NavLinks>
          <NavIcons>
            <IconContainer>
              <Link to="/wishList">
                {wishListItems.length > 0 && (
                  <IconCount>{wishListItems.length}</IconCount>
                )}
                <FaRegHeart />
              </Link>
            </IconContainer>
            <IconContainer>
              <Link to="/cart">
                {cartItems.length > 0 && (
                  <IconCount>{cartItems.length}</IconCount>
                )}
                <AiOutlineShoppingCart />
              </Link>
            </IconContainer>

            {userInfo ? (
              <>
                <span>{userInfo.name}</span>
                <UserIcon ref={userIconRef} onClick={toggleDropdown}>
                  <FaRegUser />
                  {dropdownOpen && (
                    <DropdownMenu ref={dropdownRef}>
                      <li>
                        <DropdownItemLink to="/account">
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
                        <DropdownItemLink to="/reviews">
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
                  )}
                </UserIcon>
              </>
            ) : (
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            )}
          </NavIcons>
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

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

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

const NavIcons = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 10;
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
    font-size: 1.6rem !important;
  }
`;

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

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

export default Navbar;
