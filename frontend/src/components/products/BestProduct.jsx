import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const COUNTDOWN_FROM = "12/31/2024";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MAX_DAYS = 1;

const Container = styled.div`
  background-color: var(--color-black);
  padding: 12rem 8rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 4rem;
  color: var(--color-white);

  @media (max-width: 768px) {
    width: 80%;
    padding: 0 3rem;
    margin-bottom: 4rem;
  }
`;

const CountdownWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CountdownItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--color-white);
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 6rem;
    height: 6rem;
  }
`;

const NumberWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Number = styled.span`
  font-size: 2.5rem;
  color: var(--color-black);
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Text = styled.span`
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: 700;
  color: var(--color-black);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: var(--color-green-2);
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
    background: var(--color-primary-1);
  }
`;

const ImageWrapper = styled.div`
  max-width: 400px;
  padding: 0 2rem;

  @media (max-width: 768px) {
    order: -1;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const BestProduct = () => {
  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleCountdown = () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = end - now;

    const days = MAX_DAYS;
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    setRemaining({ days, hours, minutes, seconds });
  };

  return (
    <Container>
      <Title>Enhance Your Music Experience</Title>
      <ContentWrapper>
        <Content>
          <CountdownWrapper>
            <CountdownItem num={remaining.days} text="days" />
            <CountdownItem num={remaining.hours} text="hours" />
            <CountdownItem num={remaining.minutes} text="minutes" />
            <CountdownItem num={remaining.seconds} text="seconds" />
          </CountdownWrapper>
          <Button>
            <Link to="/products"> Buy Now!</Link>
          </Button>
        </Content>
        <ImageWrapper>
          <ProductImage src="/jbl.png" alt="Product" />
        </ImageWrapper>
      </ContentWrapper>
    </Container>
  );
};

const CountdownItem = ({ num, text }) => {
  return (
    <CountdownItemWrapper>
      <NumberWrapper>
        <Number>{num}</Number>
      </NumberWrapper>
      <Text>{text}</Text>
    </CountdownItemWrapper>
  );
};

export default BestProduct;
