import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { saveSheppingAddress } from "../../redux/slices/cartSlice";
import { useProfileMutation } from "../../redux/slices/usersApiSlice";
import { toast } from "react-toastify";
import styled from "styled-components";
import Loading from "../ui/Loading";
import FormFields from "../ui/FormFields";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);

  const initialProfile = {
    fullName: userInfo?.name || "",
    email: userInfo?.email || "",
    address: shippingAddress?.address || "",
    country: shippingAddress?.country || "",
    postalCode: shippingAddress?.postalCode || "",
    city: shippingAddress?.city || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [profile, setProfile] = useState(initialProfile);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const [updateProfile, { isLoading: isLoadingProfile }] = useProfileMutation();

  const handleSaveChanges = async () => {
    try {
      const updateProfileInfo = {
        id: userInfo._id,
        name: profile.fullName,
        email: profile.email,
      };

      const updateShoppingAddress = {
        address: profile.address,
        country: profile.country,
        postalCode: profile.postalCode,
        city: profile.city,
      };

      if (
        profile.currentPassword &&
        profile.newPassword &&
        profile.confirmNewPassword
      ) {
        updateProfileInfo.currentPassword = profile.currentPassword;
        updateProfileInfo.newPassword = profile.newPassword;
        updateProfileInfo.confirmNewPassword = profile.confirmNewPassword;
      }

      const updatedUser = await updateProfile(updateProfileInfo).unwrap();
      dispatch(setCredentials(updatedUser));
      dispatch(
        saveSheppingAddress({ ...shippingAddress, ...updateShoppingAddress })
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    toast.info("Changes canceled");
  };
  const fields = [
    { id: "fullName", label: "Full Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "address", label: "Address", type: "text" },
    { id: "country", label: "Country", type: "text" },
    { id: "postalCode", label: "Postal Code", type: "text" },
    { id: "city", label: "City", type: "text" },
    { id: "currentPassword", label: "Current Password", type: "password" },
    { id: "newPassword", label: "New Password", type: "password" },
    {
      id: "confirmNewPassword",
      label: "Confirm New Password",
      type: "password",
    },
  ];

  return (
    <Form>
      <FormHeader>Edit Your Profile</FormHeader>
      <FormBody>
        <FormFields
          fields={fields}
          formFields={profile}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
          <SaveButton type="button" onClick={handleSaveChanges}>
            {isLoadingProfile ? <Loading height={"0rem"} /> : "Save Changes"}
          </SaveButton>
        </ButtonGroup>
      </FormBody>
    </Form>
  );
}

const Form = styled.div`
  padding: 1rem;
`;

const FormHeader = styled.h2`
  font-size: 1.6rem;
  color: var(--color-primary-1);
  margin-bottom: 4rem;
`;

const FormBody = styled.div`
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

export default Profile;
