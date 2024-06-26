import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaLaptop,
  FaCamera,
  FaHeadphones,
  FaGamepad,
  FaClock,
} from "react-icons/fa";
import FlashSalesHeader from "./FlashSalesHeader";
import Carousel from "../ui/Carousel";

const categories = [
  { name: "Phones", icon: <FaMobileAlt /> },
  { name: "Computers", icon: <FaLaptop /> },
  { name: "SmartWatch", icon: <FaClock /> },
  { name: "Camera", icon: <FaCamera /> },
  { name: "HeadPhones", icon: <FaHeadphones /> },
  { name: "Gaming", icon: <FaGamepad /> },
];

const CategoryCarousel = ({ itemsPerSlide }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/search/${categoryName.toLowerCase()}`);
  };

  return (
    <Container>
      <FlashSalesHeader
        title="Categories"
        title2="Browse By Category"
        displayCountdown={false}
      />
      <Carousel
        data={categories}
        isLoading={false}
        isError={false}
        itemsPerSlide={itemsPerSlide}
        renderCard={(category) => (
          <CategoryCard
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
          >
            <Icon>{category.icon}</Icon>
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        )}
      />
    </Container>
  );
};

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

const CategoryCard = styled.div`
  width: 100%;
  color: var(--color-black);
  border: 1px solid var(--color-grey-1);
  border-radius: 10px;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  svg {
    font-size: 6rem;
    margin-bottom: 2rem;
  }

  &:hover {
    background-color: var(--color-primary-1);
    color: var(--color-white-2);
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CategoryName = styled.div`
  font-size: 1.8rem;
`;

export default CategoryCarousel;
