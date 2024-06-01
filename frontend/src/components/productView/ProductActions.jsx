import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductActions = ({
  product,
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleAddToCart,
  handleAddToWishList,
  isProductInWishList,
  setQuantity,
  selectedColor,
  selectedSize,
}) => (
  <Container>
    <QuantityControl>
      <QuantityButton onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
        <FaMinus />
      </QuantityButton>
      <Quantity
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <QuantityButton
        onClick={handleIncreaseQuantity}
        disabled={quantity >= product.countInStock || quantity >= 10}
      >
        <FaPlus />
      </QuantityButton>
    </QuantityControl>
    <BuyButton onClick={handleAddToCart}>Add to Cart</BuyButton>
    <WishListButton onClick={() => handleAddToWishList(product)}>
      {isProductInWishList(product._id) ? (
        <FaHeart size={24} style={{ color: "var(--color-primary-1)" }} />
      ) : (
        <FaRegHeart size={24} />
      )}
    </WishListButton>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-grey-1);
  border-radius: 5px;

  button:first-child {
    border-right: 1px solid var(--color-grey-1);
  }

  button:last-child {
    border-left: 1px solid var(--color-grey-1);
    background-color: var(--color-primary-1);
    color: var(--color-white);
  }
`;

const QuantityButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Quantity = styled.input`
  font-size: 1.6rem;
  width: 5rem;
  text-align: center;
  margin: 0 0.5rem;
  border: none;
  background-color: transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
  }
`;

const BuyButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-1);
  border-radius: 5px;
  color: var(--color-white);
  border: none;
  cursor: pointer;
`;

const WishListButton = styled.button`
  padding: 0.7rem 1.2rem;
  background-color: transparent;
  color: var(--color-grey-3);
  border: 1px solid var(--color-grey-1);
  border-radius: 5px;
  cursor: pointer;
`;

export default ProductActions;
