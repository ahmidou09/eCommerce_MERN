import React from "react";
import styled from "styled-components";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  height: 85vh;
`;

const Breadcrumb = styled.div`
  margin-bottom: 4rem;
  padding: 1rem;
  color: var(--color-grey-1);

  span {
    color: var(--color-black);
  }
`;

const ContactContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoBlock = styled.div`
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-red-1);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoText = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-3);
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  flex: 2;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Input = styled.input`
  padding: 1.5rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-4);
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 1.5rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-4);
  border-radius: 4px;
  height: 10rem;
`;

const Button = styled.button`
  padding: 1.5rem;
  font-size: 1.6rem;
  color: var(--color-white);
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-red-1);
  }
`;

const Contact = () => {
  return (
    <Container>
      <Breadcrumb>
        <Link to="/">Home</Link> / <span>Contact</span>
      </Breadcrumb>
      <ContactContainer>
        <InfoContainer>
          <InfoBlock>
            <InfoTitle>
              <FaPhone style={{ marginRight: "0.5rem" }} /> Call To Us
            </InfoTitle>
            <InfoText>We are available 24/7, 7 days a week.</InfoText>
            <InfoText>Phone: +8801611112222</InfoText>
          </InfoBlock>
          <hr />
          <InfoBlock>
            <InfoTitle>
              <FaEnvelope style={{ marginRight: "0.5rem" }} /> Write To Us
            </InfoTitle>
            <InfoText>
              Fill out our form and we will contact you within 24 hours.
            </InfoText>
            <InfoText>Emails: customer@exclusive.com</InfoText>
            <InfoText>Emails: support@exclusive.com</InfoText>
          </InfoBlock>
        </InfoContainer>
        <FormContainer>
          <Form>
            <Input type="text" placeholder="Your Name *" required />
            <Input type="email" placeholder="Your Email *" required />
            <Input type="tel" placeholder="Your Phone *" required />
            <TextArea placeholder="Your Message" required />
            <Button type="submit">Send Message</Button>
          </Form>
        </FormContainer>
      </ContactContainer>
    </Container>
  );
};

export default Contact;
