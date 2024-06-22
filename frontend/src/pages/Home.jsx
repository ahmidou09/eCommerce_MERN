import React from "react";
import Products from "../components/products/Products";
import Filter from "../components/ui/Filter";
import styled from "styled-components";
import Slide from "../components/slide/Slide";
import Meta from "../components/ui/Meta";

const HomeContainer = styled.div`
  min-height: 120vh;
`;

const Herder = styled.header`
  display: flex;
  gap: 2rem;
  margin-bottom: 6rem;
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
      </Container>
      <Products />
    </HomeContainer>
  );
}

export default Home;
