import React from "react";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import Carousel from "../ui/Carousel";
import FlashSalesHeader from "./FlashSalesHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "../card/Card";

function FlashSales({ title, title2, itemsPerSlide, displayCountdown }) {
  const { data, isLoading, isError } = useGetProductsQuery({
    category: "",
    keyword: "",
    pageNumber: 1,
  });

  return (
    <Container>
      <FlashSalesHeader title={title} title2={title2} displayCountdown={displayCountdown} />
      <Carousel
        data={data?.products}
        isLoading={isLoading}
        isError={isError}
        itemsPerSlide={itemsPerSlide}
        renderCard={(product) => (
          <Card key={product._id} products={[product]} />
        )}
      />
      <ButtonContainer>
        <Button>
          <Link to="/products">View All Products</Link>
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 120rem;
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
  color: var(--color-white-2);
  z-index: 1;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: var(--color-primary-1);
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;

  a {
    color: var(--color-white-2);
    padding: 1rem 3rem;
    text-decoration: none;
    display: block;
    width: 100%;
  }

  &:hover {
    background: var(--color-primary-2);
  }
`;

export default FlashSales;
