import React, { useState } from "react";
import styled from "styled-components";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--color-black);
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;

  .logo {
  }

  .navbar {
    &_links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    &_link {
      cursor: pointer;
    }

    &_icons {
      display: flex;
      align-items: center;
      gap: 2rem;
      cursor: pointer;

      &_user {
        position: relative;
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
      }

      &_dropdown {
        position: absolute;
        top: 3.5rem;
        right: 0;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        overflow: hidden;
        z-index: 10;
        display: flex;
        flex-direction: column;
        width: 15rem;
      }

      &_dropdown_item {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--color-black);
        text-decoration: none;

        &:hover {
          background-color: var(--color-primary-1);
          color: var(--color-white);
        }

        svg {
          font-size: 1.4rem;
        }
      }
    }

    &_icon {
      &_container {
        position: relative;
      }
      &_count {
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
      }

      svg {
        font-size: 2rem;
      }
    }
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  const cartItemsCount = cartItems.length;
  const wishListItemsCount = wishListItems.length;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <NavBar>
      <Container>
        <NavbarContainer>
          <div className="logo">
            <Link to="/">
              <span>eCommerceShop</span>
            </Link>
          </div>
          <ul className="navbar_links">
            <li className="navbar_link">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar_link">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="navbar_link">
              <Link to="/about">About</Link>
            </li>
            <li className="navbar_link">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>

          <ul className="navbar_icons">
            <li className="navbar_icon">
              <Link to="/wishList">
                <div className="navbar_icon_container">
                  {wishListItemsCount > 0 && (
                    <span className="navbar_icon_count">
                      {wishListItemsCount}
                    </span>
                  )}
                  <FaRegHeart />
                </div>
              </Link>
            </li>

            <li className="navbar_icon">
              <Link to="/cart">
                <div className="navbar_icon_container">
                  {cartItemsCount > 0 && (
                    <span className="navbar_icon_count">{cartItemsCount}</span>
                  )}
                  <AiOutlineShoppingCart />
                </div>
              </Link>
            </li>
            <li
              className="navbar_icon navbar_icons_user"
              onClick={toggleDropdown}
            >
              <FaRegUser />
              {dropdownOpen && (
                <div className="navbar_icons_dropdown">
                  <Link to="/account" className="navbar_icons_dropdown_item">
                    <FaRegUser />
                    Manage My Account
                  </Link>
                  <Link to="/orders" className="navbar_icons_dropdown_item">
                    <AiOutlineShoppingCart />
                    My Order
                  </Link>
                  <Link
                    to="/cancellations"
                    className="navbar_icons_dropdown_item"
                  >
                    <FaRegHeart />
                    My Cancellations
                  </Link>
                  <Link to="/reviews" className="navbar_icons_dropdown_item">
                    <FaRegHeart />
                    My Reviews
                  </Link>
                  <Link to="/logout" className="navbar_icons_dropdown_item">
                    <FaRegUser />
                    Logout
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </NavbarContainer>
      </Container>
    </NavBar>
  );
}

export default Navbar;
