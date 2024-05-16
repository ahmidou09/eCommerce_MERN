import React from "react";
import styled from "styled-components";
import productsData from "../data/productsData";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem;
`;

const FlashSalesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.4rem;
`;

const Timer = styled.div`
  display: flex;
  font-size: 1.8rem;
`;

const TimerSegment = styled.div`
  margin: 0 0.5rem;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductCard = styled.div`
  width: 22%;
  border: 1px solid var(--color-grey-0);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const ProductOldPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-grey-0);
  margin-left: 0.5rem;
`;

const ProductRating = styled.div`
  margin-top: 0.5rem;
`;

const ProductDiscount = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-button-red-1);
  color: var(--color-white);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const Products = () => {
  return (
    <Container>
      <FlashSalesHeader>
        <Title>Flash Sales</Title>
        <Timer>
          <TimerSegment>Days</TimerSegment>:<TimerSegment>Hours</TimerSegment>:
          <TimerSegment>Minutes</TimerSegment>:
          <TimerSegment>Seconds</TimerSegment>
        </Timer>
      </FlashSalesHeader>
      <ProductsGrid>
        {productsData.map((product) => (
          <ProductCard key={product._id}>
            {product.discount && (
              <ProductDiscount>-{product.discount}%</ProductDiscount>
            )}
            <ProductImage src="./images/demo.png" alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              ${product.price}{" "}
              <ProductOldPrice>${product.oldPrice}</ProductOldPrice>
            </ProductPrice>
            <ProductRating>
              ⭐ {product.rating} ({product.numReviews})
            </ProductRating>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default Products;
