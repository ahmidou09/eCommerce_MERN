import React from "react";
import styled from "styled-components";
import ShiftingCountdown from "../ui/ShiftingCountdown";

function FlashSalesHeader({ title, title2, displayCountdown = true }) {
  return (
    <Header>
      <Today>{title}</Today>
      <Countdown>
        <Title>{title2}</Title>
        {displayCountdown && <ShiftingCountdown />}
      </Countdown>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
const Title = styled.h2`
  font-size: 3.4rem;
  color: var(--color-black);
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Countdown = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export default FlashSalesHeader;
