import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../redux/slices/usersApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../../components/ui/Errors";
import { toast } from "react-toastify";
import TableItems from "../../components/ui/TableItems";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import Paginate from "../../components/ui/Paginate";

function UserList() {
  const { pageNumber } = useParams();
  const basePath = "/admin/users";
  const {
    data,
    isLoading: loadingUsers,
    isError: error,
    refetch,
  } = useGetUsersQuery({ pageNumber });

  // Delete user mutation
  const [deleteUser, { isLoading: loadingDeleteUser }] =
    useDeleteUserMutation();

  // Handle User deletion
  const deleteHandler = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error(error.data.message || "An error occurred");
    }
  };

  const columns = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "admin", title: "Admin" },
    { key: "actions", title: "Actions" },
  ];

  const renderUserRow = (user) => (
    <tr key={user._id}>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        {user.isAdmin ? <FaCheck color="green" /> : <FaTimes color="red" />}
      </td>
      <td>
        <ButtonWrapper>
          <Button>
            <Link to={`/admin/users/${user._id}/edit`}>
              <FaRegEdit />
            </Link>
          </Button>
          <Button
            disabled={loadingDeleteUser}
            onClick={() => deleteHandler(user._id)}
          >
            <MdDeleteOutline />
          </Button>
        </ButtonWrapper>
      </td>
    </tr>
  );

  return (
    <Container>
      {loadingUsers ? (
        <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
      ) : error ? (
        <Errors message="An error occurred" />
      ) : (
        <>
          <Header>
            <h1>List of Users</h1>
          </Header>
          <TableItems
            data={data.users}
            columns={columns}
            renderItem={renderUserRow}
            itemPerPage={8}
          />
          <Paginate pages={data.pages} page={data.page} basePath={basePath} />
        </>
      )}

      {loadingUsers && <Skeleton count={10} height={50} />}
      {error && <Errors message="An error occurred" />}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 65vh;
`;

const Header = styled.div`
  margin-bottom: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: var(--color-primary-1);
  color: var(--color-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

export default UserList;
