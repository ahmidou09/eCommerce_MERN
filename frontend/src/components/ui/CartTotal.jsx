import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

function CartTotal({ style }) {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <CartTotalContainer style={style}>
      <Total>
        <h3>Cart Totals</h3>
        <div>
          <p>
            <span>Subtotal:</span> <span>${itemsPrice}</span>
          </p>
          <p>
            <span>Shipping:</span>{" "}
            <span>{shippingPrice === 0 ? "Free" : `$${shippingPrice}`}</span>
          </p>
          <p>
            <span>Tax:</span> <span>${taxPrice}</span>
          </p>
          <p style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
            <span>Total:</span> <span>${totalPrice}</span>
          </p>
        </div>
      </Total>
    </CartTotalContainer>
  );
}

const CartTotalContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  border: 1px solid var(--color-grey-2);
`;

const Total = styled.div`
  flex: 1;
  gap: 1rem;
  border-radius: 5px;
  padding: 2rem 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-grey-2);
    padding: 1rem;

    display: flex;
    justify-content: space-between;
  }
`;

export default CartTotal;
