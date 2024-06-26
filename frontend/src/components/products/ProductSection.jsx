import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FlashSalesHeader from "./FlashSalesHeader";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 4rem;
`;
const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 30rem);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 30rem);
  }
`;

const Item = styled.div`
  background-size: cover;
  padding: 2rem;
  background-position: center;
  position: relative;
  border-radius: 0.4rem;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background-color: var(--color-black);
  color: var(--color-white);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.015);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  }
`;

const LargeItem = styled(Item)`
  grid-column: 1 / span 2;
  grid-row: 1 / -1;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    grid-row: 1 / 3;
  }
`;

const MediumItem = styled(Item)`
  grid-column: 3 / span 2;
  grid-row: span 1;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  }
`;

const SmallItem = styled(Item)`
  grid-column: span 1;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
  }
`;

const TextContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  transition: background 0.3s;
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  &:before {
    content: "";
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    width: 100%;
    height: 50%;
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    transition: top 0.3s, opacity 0.3s;
  }

  ${Item}:hover & {
    &:before {
      opacity: 1;
      top: 50%;
    }
  }
`;

const ItemTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  transition: top 0.3s, opacity 0.3s;
  position: relative;
  top: 100px;
  opacity: 0;
  ${Item}:hover & {
    top: 0;
    opacity: 1;
    transition-delay: 0.15s;
  }
`;

const ItemDescription = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  transition: top 0.3s, opacity 0.3s;
  position: relative;
  top: 100px;
  opacity: 0;
  ${Item}:hover & {
    top: 0;
    opacity: 1;
    transition-delay: 0.25s;
  }
`;

const ShopNowButton = styled(Link)`
  color: var(--color-white);
  text-decoration: underline;
  cursor: pointer;
  transition: top 0.3s, opacity 0.3s;
  position: relative;
  z-index: 2;
  top: 100px;
  opacity: 0;
  ${Item}:hover & {
    top: 0;
    opacity: 1;
    transition-delay: 0.35s;
  }
`;

const products = [
  {
    id: 1,
    type: "large",
    title: "PlayStation 5",
    description: "Black and white version of the PS5 coming out on sale.",
    imageUrl: "/ps5.png",
  },
  {
    id: 2,
    type: "medium",
    title: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    imageUrl: "/women-collection.png",
  },
  {
    id: 3,
    type: "small",
    title: "Speakers",
    description: "Amazon wireless speakers.",
    imageUrl: "/speakers.png",
  },
  {
    id: 4,
    type: "small",
    title: "Perfume",
    description: "GUCCI INTENSE-OUD EDP.",
    imageUrl: "/perfume.png",
  },
];

const ProductSection = () => {
  return (
    <Container>
      <FlashSalesHeader
        title={"Featured"}
        title2={"New Arrival"}
        displayCountdown={false}
      />
      <SectionContainer>
        {products.map((product) => {
          const ItemComponent =
            product.type === "large"
              ? LargeItem
              : product.type === "medium"
              ? MediumItem
              : SmallItem;

          return (
            <ItemComponent
              key={product.id}
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            >
              <TextContainer>
                <ItemTitle>{product.title}</ItemTitle>
                <ItemDescription>{product.description}</ItemDescription>
                <ShopNowButton to={`/products`}>Shop Now</ShopNowButton>
              </TextContainer>
            </ItemComponent>
          );
        })}
      </SectionContainer>
    </Container>
  );
};

export default ProductSection;
