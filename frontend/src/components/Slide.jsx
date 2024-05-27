import React from "react";
import styled from "styled-components";
import SwipeCarousel from "./SwipeCarousel";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
import Loading from "./Loading";
import Errors from "./Errors";

const SlideContainer = styled.div`
  width: 80%;
  padding-top: 2rem;
`;

function Slide() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <SlideContainer>
      {isLoading ? (
        <Loading height={"20rem"} />
      ) : isError ? (
        <Errors message="An error occurred" />
      ) : (
        <SwipeCarousel slideData={products} />
      )}
    </SlideContainer>
  );
}

export default Slide;
