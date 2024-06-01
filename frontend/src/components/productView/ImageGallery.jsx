import React from "react";
import styled from "styled-components";

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => (
  <Container>
    <div>
      {images.map((image, index) => (
        <Thumbnail
          key={index}
          src={image}
          onClick={() => setSelectedImage(image)}
          selected={selectedImage === image}
        />
      ))}
    </div>
    <MainImage src={selectedImage} />
  </Container>
);

const Container = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  padding: 0.5rem;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.selected ? "var(--color-black)" : "transparent")};
`;

const MainImage = styled.img`
  width: 40rem;
  height: 40rem;
  padding: 3rem;
  object-fit: cover;
`;

export default ImageGallery;
