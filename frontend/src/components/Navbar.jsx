import React from "react";
import styled from "styled-components";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavBar = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--color-primary-1);
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
        background-color: var(--color-button-red-1);
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
        background-color: var(--color-button-red-1);
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
  return (
    <NavBar>
      <Container>
        <NavbarContainer>
          <div className="logo">
            <span>eCommerceShop</span>
          </div>
          <ul className="navbar_links">
            <li className="navbar_link">Home</li>
            <li className="navbar_link">Contact</li>
            <li className="navbar_link">About</li>
            <li className="navbar_link">Sign Up</li>
          </ul>

          <ul className="navbar_icons">
            <li className="navbar_icon">
              <FaRegHeart />
            </li>
            <li className="navbar_icon">
              <div className="navbar_icon_container">
                <span className="navbar_icon_count">4</span>
                <AiOutlineShoppingCart />
              </div>
            </li>
            <li className="navbar_icon navbar_icons_user">
              <FaRegUser />
            </li>
          </ul>
        </NavbarContainer>
      </Container>
    </NavBar>
  );
}

export default Navbar;
