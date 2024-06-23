import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import Card from "../card/Card";
import { motion, useMotionValue } from "framer-motion";
import ShiftingCountdown from "../ui/ShiftingCountdown";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
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

const ITEMS_PER_SLIDE = 4;

function FlashSales() {
  const { data, isLoading, isError } = useGetProductsQuery({
    category: "",
    keyword: "",
    pageNumber: 1,
  });
  const [slidesIndex, setSlidesIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      if (dragX.get() === 0) {
        setSlidesIndex((prevIndex) =>
          prevIndex === Math.ceil(data.products?.length / ITEMS_PER_SLIDE) - 1
            ? 0
            : prevIndex + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, data?.products?.length]);

  const handleDragEnd = () => {
    const x = dragX.get();
    if (
      x <= -DRAG_BUFFER &&
      slidesIndex < Math.ceil(data.products?.length / ITEMS_PER_SLIDE) - 1
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
    if (slidesIndex < Math.ceil(data.products?.length / ITEMS_PER_SLIDE) - 1)
      setSlidesIndex(slidesIndex + 1);
  };

  return (
    <Container>
      <FlashSalesHeader>
        <Today>Today’s</Today>
        <ShiftingCountdown />
      </FlashSalesHeader>
      {isLoading ? (
        <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
      ) : isError ? (
        <Errors message="An error occurred" style={{ height: "20vh" }} />
      ) : data && data.products.length === 0 ? (
        <NoProductsMessage>No products found</NoProductsMessage>
      ) : (
        <CarouselMotionDiv
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${slidesIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={handleDragEnd}
        >
          {data.products?.map((product, idx) => (
            <SlideContainer
              key={idx}
              style={{ width: `${100 / ITEMS_PER_SLIDE}%` }}
              animate={{ scale: slidesIndex === idx ? 0.85 : 0.85 }}
              transition={SPRING_OPTIONS}
            >
              <Card products={[product]} key={product._id} />
            </SlideContainer>
          ))}
        </CarouselMotionDiv>
      )}
      <ArrowContainer>
        <ArrowButton style={{ left: "1rem" }} onClick={handlePrevClick}>
          <FaArrowLeft />
        </ArrowButton>
        <ArrowButton style={{ right: "1rem" }} onClick={handleNextClick}>
          <FaArrowRight />
        </ArrowButton>
      </ArrowContainer>
      <ButtonContainer>
        <Button>
          <Link to="/products">View All Products</Link>
        </Button>
      </ButtonContainer>
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

const FlashSalesHeader = styled.div`
  padding: 2rem 0;
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

const ArrowContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 0;
  display: flex;
  gap: 4rem;
  z-index: 2;
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
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: var(--color-primary-1);
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;

  a {
    color: var(--color-white-2);
    padding: 1rem 3rem;
    text-decoration: none;
    display: block;
    width: 100%;
  }

  &:hover {
    background: var(--color-primary-2);
  }
`;

export default FlashSales;
