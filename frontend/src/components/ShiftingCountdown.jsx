import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const COUNTDOWN_FROM = "12/31/2024";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Container = styled.div`
  display: flex;
  justify-content: start;
  gap: 8rem;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
`;

const Title = styled.h2`
  font-size: 3.4rem;
  color: var(--color-black);
`;

const CountdownWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  display: flex;
  overflow: hidden;
`;

const CountdownItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;

  &:not(:first-child) {
    &::before {
      content: ":";
      font-size: 4rem;
      color: var(--color-primary-1);
      left: -40%;
      top: 55%;
      transform: translateY(-50%);
      position: absolute;
    }
  }
`;

const NumberWrapper = styled.div`
  width: 100%;
`;

const Number = styled.span`
  font-size: 3.8rem;
  color: var(--color-black);
  font-weight: 700;
`;

const Text = styled.span`
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: 700;
  color: var(--color-black);
  width: 100%;
`;

const ShiftingCountdown = () => {
  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = end - now;

    const days = Math.floor(0);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    setRemaining({ days, hours, minutes, seconds });
  };

  return (
    <Container>
      <Title>Flash Sales</Title>
      <CountdownWrapper>
        <CountdownItem num={remaining.days} text="days" />
        <CountdownItem num={remaining.hours} text="hours" />
        <CountdownItem num={remaining.minutes} text="minutes" />
        <CountdownItem num={remaining.seconds} text="seconds" />
      </CountdownWrapper>
    </Container>
  );
};

const CountdownItem = ({ num, text }) => {
  return (
    <CountdownItemWrapper>
      <Text>{text}</Text>
      <NumberWrapper>
        <Number>{num}</Number>
      </NumberWrapper>
    </CountdownItemWrapper>
  );
};

export default ShiftingCountdown;
