import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-black);
  color: var(--color-white-2);
  z-index: 1;

  @media (max-width: 560px) {
    padding: 5rem 1rem;
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

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  img {
    width: 30rem;
    height: 30rem;
    object-fit: cover;

    @media (max-width: 560px) {
      width: 80%;
      height: 100%;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 30rem;

  @media (max-width: 560px) {
    width: 100%;
  }

  h3 {
    font-size: 2.4rem;
  }

  h1 {
    font-size: 4.2rem;
    margin-bottom: 2rem;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    @media (max-width: 560px) {
      display: none;
    }

    a {
      text-transform: capitalize;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      border-bottom: 1px solid var(--color-white-2);
      padding-bottom: 1.5rem;
    }

    svg {
      transform: translateY(-5px);
    }
  }
`;

const DotsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 8px;
`;

const DotButton = styled.button`
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  transition: background-color 0.2s;
`;

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 3;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const SwipeCarousel = ({ slideData }) => {
  const [slidesIndex, setSlidesIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      if (dragX.get() === 0) {
        setSlidesIndex((prevIndex) =>
          prevIndex === slideData?.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, slideData?.length]);

  const handleDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && slidesIndex < slideData?.length - 1) {
      setSlidesIndex(slidesIndex + 1);
    } else if (x >= DRAG_BUFFER && slidesIndex > 0) {
      setSlidesIndex(slidesIndex - 1);
    }
  };

  return (
    <Container>
      <CarouselMotionDiv
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${slidesIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={handleDragEnd}
      >
        {slideData?.map((product, idx) => (
          <SlideContainer
            key={idx}
            animate={{ scale: slidesIndex === idx ? 0.95 : 0.85 }}
            transition={SPRING_OPTIONS}
          >
            <ContentContainer>
              <h3>{product.name}</h3>
              <h1>Up to {product.discount}% off Voucher</h1>
              <button type="button">
                <Link to={`/products/${product._id}`}>
                  <span>Shop Now</span>
                  <FaArrowRight />
                </Link>
              </button>
            </ContentContainer>
            <img
              src={`http://localhost:5000/api/upload/${product.image}`}
              alt="Product"
            />
          </SlideContainer>
        ))}
      </CarouselMotionDiv>
      <DotsContainer>
        {slideData?.map((_, idx) => (
          <Dot
            key={idx}
            onClick={() => setSlidesIndex(idx)}
            isActive={idx === slidesIndex}
          />
        ))}
      </DotsContainer>
    </Container>
  );
};

const Dot = ({ isActive, ...props }) => (
  <DotButton
    {...props}
    style={{
      backgroundColor: isActive
        ? "var(--color-primary-1)"
        : "var(--color-grey-0)",
      border: isActive ? "2px solid var(--color-white)" : "none",
    }}
  />
);

export default SwipeCarousel;
