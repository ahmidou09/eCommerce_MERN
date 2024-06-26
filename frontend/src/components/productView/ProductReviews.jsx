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
import ReactStars from "react-rating-stars-component";

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
        id: productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setRating(0);
      setComment("");
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
              <ReviewHeader>
                <Avatar>{review.name.charAt(0)}</Avatar>
                <ReviewerDetails>
                  <strong>{review.name}</strong>
                  <ReviewDate>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </ReviewDate>
                </ReviewerDetails>
                <ReviewRating>
                  <Rating rating={review.rating} />
                </ReviewRating>
              </ReviewHeader>
              <ReviewComment>{review.comment}</ReviewComment>
            </Review>
          ))}
          {userInfo ? (
            <ReviewForm onSubmit={submitHandler}>
              <h2>Write a Customer Review</h2>
              {loadingProductReview && <Loading />}
              <FormGroup>
                <FormLabel>Rating :</FormLabel>
                <ReactStars
                  count={5}
                  onChange={(newRating) => setRating(newRating)}
                  size={24}
                  activeColor="var(--color-accent-4)"
                  value={rating}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="comment">Comment :</FormLabel>
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
  max-width: 60rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-grey-5);
    padding-bottom: 2rem;
  }
`;

const Review = styled.div`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-2);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-primary-2);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 0.75rem;
`;

const ReviewerDetails = styled.div`
  flex: 1;
`;

const ReviewDate = styled.p`
  font-size: 1rem;
  color: var(--color-grey-3);
  margin: 0;
`;

const ReviewRating = styled.div`
  margin-left: auto;
`;

const ReviewComment = styled.p`
  margin: 0;
  padding: 0.5rem 1rem;
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

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
  background: var(--color-white);
`;

const SubmitButton = styled.button`
  background-color: var(--color-primary-2);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-1);
  }
`;

export default ProductReviews;
