import React from "react";
import styled from "styled-components";
import SwipeCarousel from "./SwipeCarousel";
import productsData from "../data/productsData";

const SlideContainer = styled.div`
  width: 80%;
  padding-top: 2rem;
`;

function Slide() {
  return (
    <SlideContainer>
      <SwipeCarousel slideData={productsData} />
    </SlideContainer>
  );
}

export default Slide;
