import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled(FaStar)`
  color: var(--color-accent-4);
  margin-right: 2px;
`;

const HalfStar = styled(FaStarHalfAlt)`
  color: var(--color-accent-4);
  margin-right: 2px;
`;

const EmptyStar = styled(FaStar)`
  color: var(--color-grey-1);
  margin-right: 2px;
`;

const RatingNumber = styled.span`
  margin-left: 8px;
  font-size: 1em;
  color: var(--color-grey-1);
`;

const Rating = ({ rating, totalReviews }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <StarsContainer>
      {Array.from({ length: filledStars }, (v, i) => (
        <Star key={`full-${i}`} />
      ))}
      {hasHalfStar && <HalfStar key="half" />}
      {Array.from(
        { length: 5 - filledStars - (hasHalfStar ? 1 : 0) },
        (v, i) => (
          <EmptyStar key={`empty-${i}`} />
        )
      )}
      {totalReviews && <RatingNumber>({totalReviews} reviews)</RatingNumber>}
    </StarsContainer>
  );
};

export default Rating;
