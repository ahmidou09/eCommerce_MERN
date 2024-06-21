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

const Paragraph = styled.p`
  color: var(--color-gery-4);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TermsOfUse = () => {
  return (
    <PageContainer>
      <Title>Terms of Use</Title>
      <Paragraph>This is where the terms of use content will go.</Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam.
      </Paragraph>
    </PageContainer>
  );
};

export default TermsOfUse;
