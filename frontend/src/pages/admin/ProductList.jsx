import React from "react";
import styled from "styled-components";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../../components/ui/Errors";
import TableItems from "../../components/ui/TableItems";

function ProductList() {
  const {
    data: products,
    isLoading: loadingProducts,
    isError: error,
  } = useGetProductsQuery();

  const columns = [
    { key: "_id", title: "ID" },
    { key: "image", title: "Image" },
    { key: "name", title: "Name" },
    { key: "price", title: "Price" },
    { key: "countInStock", title: "Count In Stock" },
    { key: "category", title: "Category" },
    { key: "brand", title: "Brand" },
  ];

  const renderProductRow = (product) => (
    <tr key={product._id}>
      <td>{product._id}</td>
      <td>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        {product.countInStock > 0 ? (
          product.countInStock
        ) : (
          <span style={{ color: "var(--color-red-1)" }}>Out of Stock</span>
        )}
      </td>
      <td>{product.category}</td>
      <td>{product.brand}</td>
    </tr>
  );

  return (
    <Container>
      {loadingProducts ? (
        <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
      ) : error ? (
        <Errors message="An error occurred" />
      ) : (
        <ProductListContainer>
          <Header>
            <h1>Products</h1>
            <Button>Add Product</Button>
          </Header>
          <TableItems
            data={products}
            columns={columns}
            renderItem={renderProductRow}
            itemPerPage={8}
          />
        </ProductListContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 85vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
`;

const Button = styled.button`
  background-color: var(--color-primary-1);
  color: var(--color-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

const ProductListContainer = styled.div``;

export default ProductList;
