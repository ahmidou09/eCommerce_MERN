import React, { useState } from "react";
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

  const payPalFormFields = [
    { id: "paypalEmail", label: "PayPal Email", type: "email" },
    { id: "paypalPassword", label: "PayPal Password", type: "password" },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <div>
      <PaymentOptions>
        <PaymentOption>
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            checked={selectedPaymentMethod === "creditCard"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="creditCard">
            <FaRegCreditCard />
            <span>Credit Card</span>
          </label>
        </PaymentOption>
        <PaymentOption>
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={selectedPaymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="paypal">
            <FaPaypal />
            <span>PayPal</span>
          </label>
        </PaymentOption>
      </PaymentOptions>
      {selectedPaymentMethod === "creditCard" ? (
        <CreditCardForm>
          <FormFields
            fields={paymentFormFieldsPayment}
            formFields={formFields}
            handleInputChange={handleInputChange}
          />
        </CreditCardForm>
      ) : (
        <FormFields
          fields={payPalFormFields}
          formFields={formFields}
          handleInputChange={handleInputChange}
        />
      )}
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

const CreditCardForm = styled.div``;

export default PaymentForm;
