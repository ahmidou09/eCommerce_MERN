import React from "react";
import Filter from "../components/ui/Filter";
import styled from "styled-components";
import Slide from "../components/slide/Slide";
import Meta from "../components/ui/Meta";
import FlashSales from "../components/products/FlashSales";
import CategoryCarousel from "../components/products/CategoryCarousel";
import BestSellingProducts from "../components/products/BestSellingProducts";
import BestProduct from "../components/products/BestProfuct";

const HomeContainer = styled.div`
  min-height: 120vh;
  padding: 2rem 2rem 10rem 2rem;
  overflow-x: hidden;
`;

const Herder = styled.header`
  display: flex;
  gap: 2rem;
  margin-bottom: 12rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  overflow-x: hidden;
`;

const Hr = styled.hr`
  margin: 4rem 0;
  border: 1px solid var(--color-grey-2);
`;

function Home() {
  return (
    <HomeContainer>
      <Meta title="eCommerceShop" />
      <Container>
        <Herder>
          <Filter />
          <Slide />
        </Herder>
        <FlashSales
          title={"Today's"}
          title2={"Flash Sales"}
          itemsPerSlide={4}
          displayCountdown={true}
        />
        <Hr />
        <CategoryCarousel />
        <Hr />
        <BestSellingProducts />
        <BestProduct />
        <Hr />
        <FlashSales
          title={"Our Products"}
          title2={"Explore Our Products"}
          itemsPerSlide={5}
          displayCountdown={false}
        />
      </Container>
    </HomeContainer>
  );
}

export default Home;
