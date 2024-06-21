import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 65vh;
`;

const Breadcrumb = styled.div`
  margin-bottom: 4rem;
  padding: 1rem;
  color: var(--color-grey-1);

  span {
    color: var(--color-black);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-grey-3);
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-grey-3);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-3);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const About = () => {
  return (
    <Container>
      <Breadcrumb>
        <Link to="/">Home</Link> / <span>About Us</span>
      </Breadcrumb>
      <Title>About Us</Title>

      <Section>
        <SubTitle>Our Mission</SubTitle>
        <Text>
          Our mission is to provide high-quality products and services that
          improve the lives of our customers. We strive to achieve this by
          focusing on innovation, customer satisfaction, and sustainability.
        </Text>
      </Section>

      <Section>
        <SubTitle>Our Vision</SubTitle>
        <Text>
          Our vision is to be a global leader in our industry, known for our
          commitment to excellence and our dedication to making a positive
          impact on the world. We aim to achieve this by continuously improving
          our products and services, expanding our reach, and fostering a
          culture of integrity and respect.
        </Text>
      </Section>

      <Section>
        <SubTitle>Our Values</SubTitle>
        <Text>
          <strong>Customer Focus:</strong> We put our customers at the heart of
          everything we do.
        </Text>
        <Text>
          <strong>Innovation:</strong> We embrace new ideas and technologies to
          stay ahead of the competition.
        </Text>
        <Text>
          <strong>Integrity:</strong> We conduct our business with honesty and
          transparency.
        </Text>
        <Text>
          <strong>Sustainability:</strong> We are committed to protecting the
          environment and promoting sustainable practices.
        </Text>
        <Text>
          <strong>Teamwork:</strong> We believe in the power of collaboration
          and working together to achieve our goals.
        </Text>
      </Section>
    </Container>
  );
};

export default About;
