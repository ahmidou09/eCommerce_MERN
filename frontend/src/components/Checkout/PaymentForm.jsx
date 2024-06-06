import React from "react";
import styled from "styled-components";
import FormFields from "./FormFields";
import { FaRegCreditCard, FaPaypal } from "react-icons/fa";

const PaymentForm = ({ formFields, handleInputChange }) => {
  const paymentFormFieldsPayment = [
    { id: "nameOnCard", label: "Name on Card", type: "text" },
    { id: "cardNumber", label: "Card Number", type: "text" },
    { id: "expiryDate", label: "Expiry Date", type: "text" },
    { id: "cvv", label: "CVV", type: "text" },
  ];

  return (
    <div>
      <PaymentOptions>
        <PaymentOption>
          <input type="radio" id="creditCard" name="paymentMethod" />
          <label htmlFor="creditCard">
            <FaRegCreditCard />
            <span>Credit Card</span>
          </label>
        </PaymentOption>
        <PaymentOption>
          <input type="radio" id="paypal" name="paymentMethod" />
          <label htmlFor="paypal">
            <FaPaypal />
            <span>PayPal</span>
          </label>
        </PaymentOption>
      </PaymentOptions>
      <FormFields
        fields={paymentFormFieldsPayment}
        formFields={formFields}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

const PaymentOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type="radio"] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
`;

export default PaymentForm;
