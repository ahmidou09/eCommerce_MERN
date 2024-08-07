import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import CartTotal from "../components/ui/CartTotal";
import Meta from "../components/ui/Meta";
import TableItems from "../components/ui/TableItems";
import { BASE_URL, UPLOAD_URL } from "../constants";

const Cart = () => {
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

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

  const columns = [
    { key: "image", title: "Image" },
    { key: "name", title: "Product" },
    { key: "price", title: "Price" },
    { key: "quantity", title: "Quantity" },
    { key: "subtotal", title: "Subtotal" },
    { key: "remove", title: "Remove" },
  ];

  const renderItem = (item) => (
    <tr key={item._id}>
      <Td>
        <ProductImage
          src={`${BASE_URL}${UPLOAD_URL}${item.image}`}
          alt={item.name}
        />
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
              onClick={() => decrementQuantity(item._id, item.quantity)}
            >
              <FaMinus />
            </QuantityButton>
            <QuantityValue>{item.quantity}</QuantityValue>
            <QuantityButton
              onClick={() => incrementQuantity(item._id, item.quantity)}
              disabled={
                item.quantity >= item.countInStock || item.quantity >= 10
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
  );

  return (
    <Container>
      <Meta title="Cart" />
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
          <TableItems
            data={cartItems}
            columns={columns}
            renderItem={renderItem}
            itemPerPage={10}
          />
          <Actions>
            <Button>
              <Link to="/products">Return To Shop</Link>
            </Button>
          </Actions>
          <CartWrapper>
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
            <div className="wrapper">
              <CartTotal />
              <ProcceedToCheckout>
                {totalPrice > 0 && (
                  <Button
                    type="submit"
                    onClick={() =>
                      navigate(`${userInfo ? "/checkout" : "/login"}`)
                    }
                  >
                    Proceed to checkout
                  </Button>
                )}
              </ProcceedToCheckout>{" "}
            </div>
          </CartWrapper>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 65vh;
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

const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
  }
`;

const CouponSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    align-self: center;
    margin-bottom: 1rem;
    gap: 4rem;
  }
`;

const CouponInput = styled.input`
  padding: 1rem;
  border: 1px solid var(--color-grey-2);
  border-radius: 5px;
`;

const ProcceedToCheckout = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
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

export default Cart;
