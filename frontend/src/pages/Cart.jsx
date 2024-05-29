import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");

  const handleQuantityChange = (id, quantity) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) {
      if (quantity <= 0) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(addToCart({ ...item, quantity }));
      }
    }
  };

  const incrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity - 1);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>Product</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Subtotal</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <Td>
                <ProductImage src={item.image} alt={item.name} />
              </Td>
              <Td>{item.name}</Td>
              <Td>${item.price.toFixed(2)}</Td>
              <Td>
                <QuantityControl>
                  <QuantityButton
                    onClick={() => decrementQuantity(item._id, item.quantity)}
                  >
                    -
                  </QuantityButton>
                  <QuantityValue>{item.quantity}</QuantityValue>
                  <QuantityButton
                    onClick={() => incrementQuantity(item._id, item.quantity)}
                    disabled={item.quantity >= 10}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
              </Td>
              <Td>${(item.price * item.quantity).toFixed(2)}</Td>
              <Td>
                <RemoveButton onClick={() => handleRemoveItem(item._id)}>
                  <FaTrash />
                </RemoveButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Actions>
        <Button>
          <Link to="/">Return To Shop</Link>
        </Button>
      </Actions>
      <CouponSection>
        <CouponInput
          type="text"
          placeholder="Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <Button onClick={() => console.log("Apply Coupon")}>
          Apply Coupon
        </Button>
      </CouponSection>
      <CartTotal>
        <div>
          <p>Subtotal: ${itemsPrice}</p>
          <p>Shipping: {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}</p>
          <p>Tax: ${taxPrice}</p>
          <p>Total: ${totalPrice}</p>
        </div>
        <Button onClick={() => console.log("Proceed to checkout")}>
          Proceed to checkout
        </Button>
      </CartTotal>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-0);
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-0);
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 0.5rem;

  &:disabled {
    background-color: var(--color-grey-1);
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-danger);
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: var(--color-danger-dark);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-1);
  }
`;

const CouponSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CouponInput = styled.input`
  padding: 1rem;
  border: 1px solid var(--color-grey-0);
  border-radius: 5px;
  flex: 1;
`;

const CartTotal = styled.div`
  border: 1px solid var(--color-grey-0);
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0.5rem 0;
  }
`;

export default Cart;
