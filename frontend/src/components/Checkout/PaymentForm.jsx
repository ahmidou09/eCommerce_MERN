import React from "react";
import styled from "styled-components";
import { FaRegCreditCard, FaPaypal } from "react-icons/fa";

const PaymentForm = ({ handlePaymentMethodChange, selectedPaymentMethod }) => {
  return (
    <div>
      <PaymentOptions>
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
            <FaPaypal
              color={
                selectedPaymentMethod === "paypal"
                  ? "var(--color-purple-2)"
                  : "var(--color-grey-4)"
              }
            />
            <span
              style={
                selectedPaymentMethod === "paypal"
                  ? {
                      color: "var(--color-purple-2)",
                      fontWeight: "bold",
                    }
                  : { color: "var(--color-grey-4)" }
              }
            >
              PayPal
            </span>
          </label>
        </PaymentOption>
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
            <FaRegCreditCard
              color={
                selectedPaymentMethod === "creditCard"
                  ? "var(--color-primary-1)"
                  : "var(--color-grey-4)"
              }
            />
            <span
              style={
                selectedPaymentMethod === "creditCard"
                  ? { color: "var(--color-primary-1)", fontWeight: "bold" }
                  : { color: "var(--color-grey-4)" }
              }
            >
              Credit Card
            </span>
          </label>
        </PaymentOption>
      </PaymentOptions>
    </div>
  );
};

const PaymentOptions = styled.div`
  display: flex;
  gap: 4rem;
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
