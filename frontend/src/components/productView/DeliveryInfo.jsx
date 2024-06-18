import React from "react";
import styled from "styled-components";
import { FaTruck, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";

const DeliveryInfo = () => (
  <Container>
    <InfoContainer>
      <Icon>
        <FaTruck />
      </Icon>
      <Info>
        <TextTitle>Free Delivery</TextTitle>
        <Text>Enter your postal code for Delivery Availability</Text>
      </Info>
    </InfoContainer>
    <InfoContainer>
      <Icon>
        <FaUndo />
      </Icon>
      <Info>
        <TextTitle>Return Delivery</TextTitle>
        <Text>
          Free 30 Days Delivery Returns.{" "}
          <Link to="/privacy-policy">Details</Link>
        </Text>
      </Info>
    </InfoContainer>
  </Container>
);

const Container = styled.div`
  border: 1px solid var(--color-grey-1);
  border-radius: 5px;

  &:first-child {
    border-bottom: 1px solid var(--color-grey-1);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;

  &:first-child {
    border-bottom: 1px solid var(--color-grey-1);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Icon = styled.div`
  margin-right: 0.5rem;

  svg {
    font-size: 2rem;
  }
`;

const TextTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-3);

  a {
    color: var(--color-primary-1);
    text-decoration: underline;
  }
`;

export default DeliveryInfo;
