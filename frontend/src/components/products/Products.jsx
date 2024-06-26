import React from "react";
import styled from "styled-components";
import Card from "../card/Card";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../ui/Errors";
import Paginate from "../ui/Paginate";

const Products = ({ category }) => {
  const { keyword, pageNumber } = useParams();
  const basePath = category ? `/category/${category}` : "/products";

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    category,
    pageNumber,
  });

  return (
    <Container>
      {category && (
        <Breadcrumb>
          <Link to="/">Home</Link> / <span>{category}</span>
        </Breadcrumb>
      )}

      <Title>All Products</Title>

      <ProductsGrid>
        {isLoading ? (
          <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
        ) : isError ? (
          <Errors message="An error occurred" style={{ height: "20vh" }} />
        ) : data && data.products.length === 0 ? (
          <NoProductsMessage>No products found</NoProductsMessage>
        ) : (
          <Card products={data.products} />
        )}
      </ProductsGrid>

      {!isLoading && !isError && data && data.products.length > 0 && (
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
  margin: 4rem auto;
  padding: 2rem;
`;

const Breadcrumb = styled.div`
  margin-bottom: 4rem;
  padding: 1rem;
  color: var(--color-grey-1);

  span {
    color: var(--color-black);
  }
`;

const Title = styled.h1`
  font-size: 3.4rem;
  color: var(--color-black);
  margin-bottom: 4rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  grid-gap: 4rem;
  align-items: center;
  justify-items: center;
  margin-bottom: 4rem;
`;

const NoProductsMessage = styled.div`
  min-height: 35vh;
  grid-column: 1 / -1;
  font-size: 2.2rem;
  color: var(--color-grey-1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Products;
