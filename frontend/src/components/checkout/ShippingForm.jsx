import React from "react";
import styled from "styled-components";
import FormFields from "../ui/FormFields";

const ShippingForm = ({
  formFields,
  handleInputChange,
  saveShipping,
  handleCheckboxChange,
}) => {
  const formFieldsShipping = [
    { id: "address", label: "Address", type: "text", required: true },
    { id: "city", label: "City", type: "text", required: true },
    { id: "postalCode", label: "Code Postal", type: "text", required: true },
    { id: "country", label: "Country", type: "text", required: true },
  ];

  return (
    <ShipingFormWrapper>
      <CheckoutFormTitle>Shipping Details</CheckoutFormTitle>
      <FormFields
        fields={formFieldsShipping}
        formFields={formFields}
        handleInputChange={handleInputChange}
      />
      <SaveShipping>
        <input
          type="checkbox"
          id="saveShippingAddress"
          checked={saveShipping}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="saveShippingAddress">Save Shipping Address</label>
      </SaveShipping>
    </ShipingFormWrapper>
  );
};

const ShipingFormWrapper = styled.div`
  width: 40%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckoutFormTitle = styled.h2`
  margin-bottom: 3rem;
`;

const SaveShipping = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export default ShippingForm;
