import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "./Rating";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishList, removeFromWishList } from "../redux/slices/cartSlice";

const ProductCard = styled.div`
  width: 22%;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  transition: all 0.3s;
`;

const ImageContainer = styled.div`
  background-color: var(--color-grey-0);
  margin-bottom: 1rem;
  min-height: 30rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  .button-container {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    opacity: 0.8;
    .button-container {
      transform: translateY(0);
    }
  }
`;

const ProductImage = styled.img`
  margin-top: 3rem;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  margin-right: auto;
`;

const ProductName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary-1);
  font-weight: 500;
  padding-left: 1rem;
`;

const ProductOldPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-grey-1);
  margin-left: 0.5rem;
`;

const ProductDiscount = styled.div`
  position: absolute;
  font-size: 1.2rem;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-primary-1);
  color: var(--color-white);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const AddToCartButton = styled.button`
  border: none;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  background-color: var(--color-primary-3);
  color: var(--color-white-2);
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-3);
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--color-primary-1);
  }
`;

function Card({ products }) {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.cart.wishListItems);

  const handleAddToWishList = (product) => {
    if (wishListItems.find((x) => x._id === product._id)) {
      dispatch(removeFromWishList(product._id));
    } else {
      dispatch(addToWishList(product));
    }
  };

  const isProductInWishList = (productId) => {
    return wishListItems.some((item) => item._id === productId);
  };

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.name}>
          <Link to={`/products/${product._id}`}>
            <ImageContainer>
              {product.discount && (
                <ProductDiscount>-{product.discount}%</ProductDiscount>
              )}
              <ProductImage src={product.image} alt={product.name} />
              <div className="button-container">
                <AddToCartButton>Add to Cart</AddToCartButton>
              </div>
            </ImageContainer>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              ${product.price}{" "}
              <ProductOldPrice>${product.oldPrice}</ProductOldPrice>
            </ProductPrice>
            <Rating rating={product.rating} totalReviews={product.numReviews} />
          </Link>
          <HeartButton onClick={() => handleAddToWishList(product)}>
            {isProductInWishList(product._id) ? (
              <FaHeart size={24} style={{ color: "var(--color-primary-1)" }} />
            ) : (
              <FaRegHeart size={24} />
            )}
          </HeartButton>
        </ProductCard>
      ))}
    </>
  );
}

export default Card;
