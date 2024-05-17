import React from "react";
import styled from "styled-components";
import Card from "./Card";
import ShiftingCountdown from "./ShiftingCountdown";
import productsData from "../data/productsData";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem;
`;

const FlashSalesHeader = styled.div`
  padding: 2rem 0;
`;

const Today = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-button-red-1);
  position: relative;
  padding: 0.5rem;
  padding-left: 3rem;

  &::before {
    content: "";
    width: 2rem;
    height: 100%;
    background-color: var(--color-button-red-1);
    display: inline-block;
    position: absolute;
    border-radius: 0.5rem;
    left: 0rem;
    top: 0;
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  return (
    <Container>
      <FlashSalesHeader>
        <Today>Today’s</Today>
        <ShiftingCountdown />
      </FlashSalesHeader>
      <ProductsGrid>
        <Card productsData={productsData} />
      </ProductsGrid>
    </Container>
  );
};

export default Products;
