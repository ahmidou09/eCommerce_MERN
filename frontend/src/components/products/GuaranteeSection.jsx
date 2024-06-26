import React from "react";
import styled from "styled-components";
import { FaShippingFast, FaHeadset, FaCheckCircle } from "react-icons/fa";

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  margin-bottom: 4rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 25rem;
`;

const IconWrapper = styled.div`
  background-color: var(--color-black);
  border-radius: 50%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 1rem;

  svg {
    color: var(--color-white);
    font-size: 3rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: #666;
`;

const GuaranteeSection = () => {
  return (
    <SectionContainer>
      <Item>
        <IconWrapper>
          <FaShippingFast />
        </IconWrapper>
        <Title>FREE AND FAST DELIVERY</Title>
        <Description>Free delivery for all orders over $140</Description>
      </Item>
      <Item>
        <IconWrapper>
          <FaHeadset />
        </IconWrapper>
        <Title>24/7 CUSTOMER SERVICE</Title>
        <Description>Friendly 24/7 customer support</Description>
      </Item>
      <Item>
        <IconWrapper>
          <FaCheckCircle />
        </IconWrapper>
        <Title>MONEY BACK GUARANTEE</Title>
        <Description>We return money within 30 days</Description>
      </Item>
    </SectionContainer>
  );
};

export default GuaranteeSection;
