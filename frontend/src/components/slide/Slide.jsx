import React from "react";
import styled from "styled-components";
import SwipeCarousel from "./SwipeCarousel";
import { useGetTopProductsQuery } from "../../redux/slices/productsApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../ui/Errors";

const SlideContainer = styled.div`
  width: 80%;
  padding-top: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 0;
  }
`;

function Slide() {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  return (
    <SlideContainer>
      {isLoading ? (
        <Skeleton count={4} height={50} style={{ marginBottom: "2rem" }} />
      ) : isError ? (
        <Errors message="An error occurred" />
      ) : (
        <SwipeCarousel slideData={data} />
      )}
    </SlideContainer>
  );
}

export default Slide;
