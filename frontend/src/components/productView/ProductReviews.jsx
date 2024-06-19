import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useReviewProductMutation,
  useGetProductByIdQuery,
} from "../../redux/slices/productsApiSlice";
import { toast } from "react-toastify";
import styled from "styled-components";
import Rating from "../ui/Rating";
import Loading from "../ui/Loading";
import Errors from "../ui/Errors";

const ProductReviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useReviewProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: productId, // Ensure the id is passed here
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ReviewsContainer>
      <h2>Product Reviews</h2>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Errors message="Failed to load reviews" />
      ) : (
        <>
          {product?.reviews?.length === 0 && <Errors message="No Reviews" />}
          {product?.reviews?.map((review) => (
            <Review key={review._id}>
              <strong>{review.name}</strong>

              <Rating
                rating={review.rating}
                totalReviews={product.numReviews}
              />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </Review>
          ))}
          {userInfo ? (
            <ReviewForm onSubmit={submitHandler}>
              <h2>Write a Customer Review</h2>
              {loadingProductReview && <Loading />}
              <FormGroup>
                <FormLabel htmlFor="rating">Rating</FormLabel>
                <FormSelect
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <FormTextArea
                  id="comment"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></FormTextArea>
              </FormGroup>
              <SubmitButton type="submit" disabled={loadingProductReview}>
                Submit Review
              </SubmitButton>
            </ReviewForm>
          ) : (
            <Errors message="Please log in to write a review" />
          )}
        </>
      )}
    </ReviewsContainer>
  );
};

const ReviewsContainer = styled.div`
  margin-top: 2rem;
`;

const Review = styled.div`
  border-bottom: 1px solid var(--color-grey-2);
  padding: 1rem 0;
`;

const ReviewForm = styled.form`
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
  background: white;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
  background: white;
`;

const SubmitButton = styled.button`
  background-color: var(--color-primary-2);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-primary-1);
  }
`;

export default ProductReviews;
