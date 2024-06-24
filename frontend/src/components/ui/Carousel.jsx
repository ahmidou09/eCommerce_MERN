import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../ui/Errors";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

function Carousel({
  data,
  isLoading,
  isError,
  renderCard,
  itemsPerSlide,
  displayButtons = true,
}) {
  const [slidesIndex, setSlidesIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      if (dragX.get() === 0) {
        setSlidesIndex((prevIndex) =>
          prevIndex === Math.ceil(data?.length / itemsPerSlide) - 1
            ? 0
            : prevIndex + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, data?.length, itemsPerSlide]);

  const handleDragEnd = () => {
    const x = dragX.get();
    if (
      x <= -DRAG_BUFFER &&
      slidesIndex < Math.ceil(data?.length / itemsPerSlide) - 1
    ) {
      setSlidesIndex(slidesIndex + 1);
    } else if (x >= DRAG_BUFFER && slidesIndex > 0) {
      setSlidesIndex(slidesIndex - 1);
    }
  };

  const handlePrevClick = () => {
    if (slidesIndex > 0) setSlidesIndex(slidesIndex - 1);
  };

  const handleNextClick = () => {
    if (slidesIndex < Math.ceil(data?.length / itemsPerSlide) - 1)
      setSlidesIndex(slidesIndex + 1);
  };

  return (
    <Container>
      {displayButtons && (
        <ButtonContainer>
          <ArrowButton onClick={handlePrevClick}>
            <FaArrowLeft />
          </ArrowButton>
          <ArrowButton onClick={handleNextClick}>
            <FaArrowRight />
          </ArrowButton>
        </ButtonContainer>
      )}
      {isLoading ? (
        <Skeleton count={4} height={50} style={{ marginBottom: "2rem" }} />
      ) : isError ? (
        <Errors message="An error occurred" style={{ height: "20vh" }} />
      ) : data && data.length === 0 ? (
        <NoProductsMessage>No items found</NoProductsMessage>
      ) : (
        <CarouselMotionDiv
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${slidesIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={handleDragEnd}
        >
          {data?.map((item, idx) => (
            <SlideContainer
              key={idx}
              style={{ width: `${100 / itemsPerSlide}%` }}
              animate={{ scale: slidesIndex === idx ? 0.85 : 0.85 }}
              transition={SPRING_OPTIONS}
            >
              {renderCard(item)}
            </SlideContainer>
          ))}
        </CarouselMotionDiv>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 120rem;
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
  color: var(--color-white-2);
  z-index: 1;
  position: relative;
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

const CarouselMotionDiv = styled(motion.div)`
  display: flex;
  cursor: grab;
  align-items: top;

  &:active {
    cursor: grabbing;
  }
`;

const SlideContainer = styled(motion.div)`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const ArrowButton = styled.button`
  background: var(--color-grey-5);
  border: none;
  padding: 1rem;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--color-primary-1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4rem;
`;

export default Carousel;
