import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Meta from "../components/ui/Meta";

const MyAccount = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  return (
    <Container>
      <Meta title="My Account" />
      <Breadcrumb>
        <NavLink to="/">Home</NavLink> / {"My Account"} / <span>{path}</span>
      </Breadcrumb>
      <Content>
        <Sidebar>
          <SidebarItem>
            <NavLink to="my-profile">My Profile</NavLink>
          </SidebarItem>
          <SidebarItem>
            <NavLink to="Update-profile">Update My Profile</NavLink>
          </SidebarItem>
          <SidebarItem>
            <NavLink to="orders">My Orders</NavLink>
          </SidebarItem>
          <SidebarItem>
            <NavLink to="cancellations">My Cancellations</NavLink>
          </SidebarItem>
          <SidebarItem>
            <NavLink to="wishlist">My Wishlist</NavLink>
          </SidebarItem>
        </Sidebar>
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 120rem;
  min-height: 65vh;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Breadcrumb = styled.div`
  margin-bottom: 3rem;
  font-size: 1.6rem;
  color: var(--color-grey-3);

  a {
    color: var(--color-grey-3);
    text-decoration: none;
  }

  span {
    color: var(--color-primary-1);
  }
`;

const Content = styled.div`
  display: flex;
  gap: 4rem;
`;

const Sidebar = styled.ul`
  width: 25%;
  padding: 2rem;
  background: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarItem = styled.li`
  margin-bottom: 1rem;

  a {
    color: var(--color-grey-3);
    text-decoration: none;
  }

  .active {
    color: var(--color-primary-1);
  }
`;

const Main = styled.div`
  flex: 1;
  padding: 2rem;
  background: var(--color-white);
  border: 1px solid var(--color-grey-0);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export default MyAccount;
