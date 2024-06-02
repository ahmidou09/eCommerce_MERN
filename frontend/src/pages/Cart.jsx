import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");

  const handleQuantityChange = (id, quantity) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) {
      if (quantity === 0) {
        handleRemoveItem(id);
      } else {
        dispatch(addToCart({ ...item, quantity }));
      }
    }
  };
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const incrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity - 1);
  };

  return (
    <Container>
      <Breadcrumb>
        <Link to="/">Home</Link> / <span>Cart</span>
      </Breadcrumb>
      {cartItems.length === 0 ? (
        <EmptyCart>
          <p>Your cart is empty</p>
          <div>
            <Link to="/products">Continue Shopping</Link>
          </div>
        </EmptyCart>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Image</Th>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Subtotal</Th>
                <Th>Remove</Th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <Td>
                    <ProductImage src={item.image} alt={item.name} />
                  </Td>
                  <Td>
                    <Link to={`/products/${item._id}`} key={item._id}>
                      {item.name}
                    </Link>
                  </Td>
                  <Td>{item.countInStock > 0 ? `$${item.price}` : "-"}</Td>
                  <Td>
                    {item.countInStock > 0 ? (
                      <QuantityControl>
                        <QuantityButton
                          onClick={() =>
                            decrementQuantity(item._id, item.quantity)
                          }
                        >
                          <FaMinus />
                        </QuantityButton>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityButton
                          onClick={() =>
                            incrementQuantity(item._id, item.quantity)
                          }
                          disabled={
                            item.quantity >= item.countInStock ||
                            item.quantity >= 10
                          }
                        >
                          <FaPlus />
                        </QuantityButton>
                      </QuantityControl>
                    ) : (
                      "out of stock"
                    )}
                  </Td>
                  <Td>
                    {item.countInStock > 0
                      ? `$${(item.price * item.quantity).toFixed(2)}`
                      : "-"}
                  </Td>
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
              <Link to="/products">Return To Shop</Link>
            </Button>
          </Actions>
          <CartTotalContainer>
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
              <h3>Cart Totals</h3>
              <div>
                <p>
                  <span>Subtotal:</span> <span>${itemsPrice}</span>
                </p>
                <p>
                  <span>Shipping:</span>{" "}
                  <span>
                    {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
                  </span>
                </p>
                <p>
                  <span>Tax:</span> <span>${taxPrice}</span>
                </p>
                <p style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
                  <span>Total:</span> <span>${totalPrice}</span>
                </p>
              </div>
              {totalPrice > 0 && (
                <Button onClick={() => console.log("Proceed to checkout")}>
                  Proceed to checkout
                </Button>
              )}
            </CartTotal>
          </CartTotalContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Breadcrumb = styled.div`
  margin-bottom: 4rem;
  padding: 1rem;
  color: var(--color-grey-1);

  span {
    color: var(--color-black);
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: var(--color-grey-4);

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  div {
    a {
      border-bottom: 1px solid var(--color-grey-1);

      &:hover {
        color: var(--color-primary-2);
      }
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-2);
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-2);
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
  margin-bottom: 4rem;
`;

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

const CouponSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CartTotalContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const CouponInput = styled.input`
  padding: 1rem;
  border: 1px solid var(--color-grey-2);
  border-radius: 5px;
`;

const CartTotal = styled.div`
  border: 1px solid var(--color-grey-2);
  flex: 0.7;
  gap: 1rem;
  border-radius: 5px;
  padding: 2rem;
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

export default Cart;
