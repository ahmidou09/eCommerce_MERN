import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 2rem;
  min-height: 65vh;
`;

const Title = styled.h1`
  color: var(--color-grey-3);
  margin-bottom: 2rem;
`;

const Question = styled.h2`
  color: var(--color-grey-3);
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Answer = styled.p`
  color: var(--color-grey-4);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const FAQ = () => {
  return (
    <PageContainer>
      <Title>FAQ</Title>
      <Question>What is your return policy?</Question>
      <Answer>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam.
      </Answer>
      <Question>How do I track my order?</Question>
      <Answer>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam.
      </Answer>
    </PageContainer>
  );
};

export default FAQ;
