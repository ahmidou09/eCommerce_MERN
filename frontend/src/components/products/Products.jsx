import React from "react";
import styled from "styled-components";
import Card from "../card/Card";
import ShiftingCountdown from "../ui/ShiftingCountdown";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../ui/Errors";
import Paginate from "../ui/Paginate";

const Products = () => {
  const { keyword, pageNumber } = useParams();
  const basePath = "/products";

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <Container>
      <FlashSalesHeader>
        <Today>Today’s</Today>
        <ShiftingCountdown />
      </FlashSalesHeader>
      <ProductsGrid>
        {isLoading ? (
          <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
        ) : isError ? (
          <Errors message="An error occurred" style={{ height: "20vh" }} />
        ) : (
          <Card products={data.products} />
        )}
      </ProductsGrid>
      {!isLoading && !isError && data && (
        <Paginate
          pages={data.pages}
          page={data.page}
          basePath={basePath}
          keyword={keyword ? keyword : ""}
        />
      )}
    </Container>
  );
};

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
  color: var(--color-primary-1);
  position: relative;
  padding: 0.5rem;
  padding-left: 3rem;

  &::before {
    content: "";
    width: 2rem;
    height: 100%;
    background-color: var(--color-primary-1);
    display: inline-block;
    position: absolute;
    border-radius: 0.5rem;
    left: 0rem;
    top: 0;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  grid-gap: 4rem;
  align-items: center;
`;

export default Products;
