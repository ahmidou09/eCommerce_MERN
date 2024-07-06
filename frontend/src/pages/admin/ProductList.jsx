// ProductList.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/slices/productsApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../../components/ui/Errors";
import { toast } from "react-toastify";
import TableItems from "../../components/ui/TableItems";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Paginate from "../../components/ui/Paginate";
import Meta from "../../components/ui/Meta";
import { BASE_URL, UPLOAD_URL } from "../../constants";

function ProductList() {
  const { pageNumber } = useParams();
  const basePath = "/admin/products";

  const {
    data,
    isLoading: loadingProducts,
    isError: error,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      if (window.confirm("Are you sure you want to create a new product?")) {
        await createProduct();
        refetch();
        toast.success("Product created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred");
    }
  };

  const deleteHandler = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      toast.error(error.data.message || "An error occurred");
    }
  };

  const columns = [
    { key: "_id", title: "ID" },
    { key: "createdAt", title: "Date" },
    { key: "image", title: "Image" },
    { key: "name", title: "Name" },
    { key: "price", title: "Price" },
    { key: "countInStock", title: "Count In Stock" },
    { key: "category", title: "Category" },
    { key: "brand", title: "Brand" },
    { key: "actions", title: "Actions" },
  ];

  const renderProductRow = (product) => (
    <tr key={product._id}>
      <td>{product._id}</td>
      <td>{new Date(product.createdAt).toLocaleDateString()}</td>
      <td>
        <img
          src={`${BASE_URL}${UPLOAD_URL}/${product.image}`}
          alt={product.name}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      </td>
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
      <td>
        <ButtonWrapper>
          <Button>
            <Link to={`/admin/product/${product._id}/edit`}>
              <FaRegEdit />
            </Link>
          </Button>
          <Button
            disabled={loadingDeleteProduct}
            onClick={() => deleteHandler(product._id)}
          >
            <MdDeleteOutline />
          </Button>
        </ButtonWrapper>
      </td>
    </tr>
  );

  return (
    <Container>
      {loadingProducts ? (
        <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
      ) : error ? (
        <Errors message="An error occurred" />
      ) : (
        <>
          <Header>
            <h1>Products</h1>
            <Meta title="Admin | Products List" />
            <Button onClick={createProductHandler}>Add Product</Button>
          </Header>
          <TableItems
            data={data.products}
            columns={columns}
            renderItem={renderProductRow}
            itemPerPage={data.products.length}
          />
          <Paginate pages={data.pages} page={data.page} basePath={basePath} />
        </>
      )}

      {loadingCreateProduct && <Skeleton count={10} height={50} />}
      {error && <Errors message="An error occurred" />}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
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

export default ProductList;
