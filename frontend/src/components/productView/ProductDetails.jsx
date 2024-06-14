import React from "react";
import styled from "styled-components";
import Rating from "../ui/Rating";

const ProductDetails = ({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
}) => (
  <Container>
    <Title>{product.name}</Title>
    <Review>
      <Rating rating={product.rating} totalReviews={product.numReviews} />
    </Review>
    <Stock color={product.countInStock > 0 ? "green" : "red"}>
      {product.countInStock > 0
        ? ` In Stock : (${product.countInStock})`
        : "Out of Stock"}
    </Stock>
    <Price>${product.price.toFixed(2)}</Price>
    <Description>{product.description}</Description>
    {product.colors.length > 0 && (
      <ColorOptions>
        <span>Color: </span>
        {product.colors.map((color, index) => (
          <ColorOption
            key={index}
            color={color}
            onClick={() => setSelectedColor(color)}
            style={{
              border:
                selectedColor === color
                  ? "2px solid var(--color-black)"
                  : "none",
            }}
          />
        ))}
      </ColorOptions>
    )}
    {product.sizes.length > 0 && (
      <SizeOptions>
        <span>Size: </span>
        {product.sizes.map((size, index) => (
          <SizeOption
            key={index}
            selected={selectedSize === size}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </SizeOption>
        ))}
      </SizeOptions>
    )}
  </Container>
);

const Container = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Stock = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.color};
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-primary-1);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-4);
  margin-bottom: 1rem;
`;

const ColorOptions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
  cursor: pointer;
`;

const SizeOptions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const SizeOption = styled.div`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: 1px solid var(--color-grey-1);
  border-radius: 5px;
  margin-right: 0.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "var(--color-grey-1)" : "transparent"};
`;

export default ProductDetails;
