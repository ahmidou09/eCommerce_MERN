import React from "react";
import styled from "styled-components";

function UserList() {
  return <UserListContainer>UserList</UserListContainer>;
}

const UserListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--color-red-1);
  min-height: 85vh;
`;

export default UserList;
