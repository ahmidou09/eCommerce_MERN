import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AddressBook = () => {
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <AddressBookContaner>
      <div>
        <h2>User Informition </h2>
        <p> Name: {userInfo.name}</p>
        <p> Email: {userInfo.email}</p>
      </div>

      <div>
        <h2>Address Book </h2>
        <p>
          Shipping Address: {shippingAddress.address} {shippingAddress.city}{" "}
          {shippingAddress.postalCode} {shippingAddress.country}
        </p>
      </div>

      <div>
        <h2>My Payment Options</h2>
        <p>
          Payment Method: <span>{paymentMethod}</span>{" "}
        </p>
      </div>
    </AddressBookContaner>
  );
};

const AddressBookContaner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  div {
    border: 1px solid var(--color-grey-1);
    border-radius: 5px;
    padding: 2rem;
  }

  h2 {
    margin-bottom: 3rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }

  span {
    text-transform: uppercase;
  }
`;

export default AddressBook;
