import React from "react";
import { useMyReviewsQuery } from "../redux/slices/productsApiSlice";
import styled from "styled-components";
import Loading from "../components/ui/Loading";
import Errors from "../components/ui/Errors";
import TableItems from "../components/ui/TableItems";
import Rating from "../components/ui/Rating";
import { Link } from "react-router-dom";
import Meta from "../components/ui/Meta";


const MyReviews = () => {
  const { data: reviews, isLoading, error } = useMyReviewsQuery();

  const flattenedReviews = reviews
    ? reviews.flatMap((product) =>
        product.reviews.map((review) => ({
          productId: product.productId,
          productName: product.productName,
          ...review,
        }))
      )
    : [];

  const columns = [
    {
      key: "productName",
      title: "Product Name",
      render: (item) => (
        <Link to={`/products/${item.productId}`}>{item.productName}</Link>
      ),
    },
    {
      key: "rating",
      title: "Rating",
      render: (item) => <Rating rating={item.rating} />,
    },
    {
      key: "comment",
      title: "Comment",
      render: (item) => item.comment,
    },
    {
      key: "createdAt",
      title: "Date",
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <ReviewsContainer>
      <h2>My Reviews</h2>
      <Meta title="My Reviews" />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Errors message="Failed to load reviews" />
      ) : (
        <TableItems
          data={flattenedReviews}
          columns={columns}
          renderItem={(item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(item)}</td>
              ))}
            </tr>
          )}
        />
      )}
    </ReviewsContainer>
  );
};

const ReviewsContainer = styled.div`
  max-width: 120rem;
  margin: 4rem auto;
  min-height: 65vh;
`;

export default MyReviews;
