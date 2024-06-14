import React from "react";
import styled from "styled-components";
import SwipeCarousel from "./SwipeCarousel";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../ui/Errors";

const SlideContainer = styled.div`
  width: 80%;
  padding-top: 2rem;
`;

function Slide() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <SlideContainer>
      {isLoading ? (
        <Skeleton count={4} height={50} style={{ marginBottom: "2rem" }} />
      ) : isError ? (
        <Errors message="An error occurred" />
      ) : (
        <SwipeCarousel slideData={products} />
      )}
    </SlideContainer>
  );
}

export default Slide;
