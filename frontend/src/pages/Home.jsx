import React from "react";
import Filter from "../components/ui/Filter";
import styled from "styled-components";
import Slide from "../components/slide/Slide";
import Meta from "../components/ui/Meta";
import FlashSales from "../components/products/FlashSales";

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
        <FlashSales />
      </Container>
    </HomeContainer>
  );
}

export default Home;
