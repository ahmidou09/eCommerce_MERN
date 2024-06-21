import React, { useState, useEffect } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Loading from "../../components/ui/Loading";
import FormFields from "../../components/ui/FormFields";

function EditInfo() {
  const { id: userId } = useParams();
  const { data: userInfo, isLoading: isLoadingUser } =
    useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isLoadingInfo }] = useUpdateUserMutation();

  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (userInfo) {
      setInfo({
        fullName: userInfo.name,
        email: userInfo.email,
        isAdmin: userInfo.isAdmin,
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setInfo({
      ...info,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const updateUserInfo = {
        id: userInfo._id,
        name: info.fullName,
        email: info.email,
        isAdmin: info.isAdmin,
      };
      await updateUser(updateUserInfo).unwrap();
      toast.success("Info updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update info");
    }
  };

  const handleCancel = () => {
    if (userInfo) {
      setInfo({
        fullName: userInfo.name,
        email: userInfo.email,
        isAdmin: userInfo.isAdmin,
      });
    }
    toast.info("Changes canceled");
  };

  const fields = [
    { id: "fullName", label: "Full Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "isAdmin", label: "Admin", type: "checkbox" },
  ];

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <EditInfoContainer>
      <Form onSubmit={handleSaveChanges}>
        <FormHeader>Edit Your Info</FormHeader>
        <FormBody>
          <FormFields
            fields={fields}
            formFields={info}
            handleInputChange={handleInputChange}
          />
          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">
              {isLoadingInfo ? <Loading height={"0rem"} /> : "Save Changes"}
            </SaveButton>
          </ButtonGroup>
        </FormBody>
      </Form>
    </EditInfoContainer>
  );
}

const EditInfoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 65vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
`;

const FormHeader = styled.h2`
  font-size: 1.6rem;
  color: var(--color-primary-1);
  margin-bottom: 4rem;
`;

const FormBody = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  color: var(--color-grey-3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-grey-4);
    color: var(--color-white);
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background: var(--color-primary-1);
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  color: var(--color-white);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: var(--color-red-1);
  }
`;

export default EditInfo;
