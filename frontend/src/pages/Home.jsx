import React from "react";
import Products from "../components/products/Products";
import Filter from "../components/Filter";
import styled from "styled-components";
import Slide from "../components/slide/Slide";

const HomeContainer = styled.div``;

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
