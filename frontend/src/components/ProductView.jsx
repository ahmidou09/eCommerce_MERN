import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import productsData from "../data/productsData";
import { FaPlus, FaMinus, FaRegHeart, FaTruck, FaUndo } from "react-icons/fa";
import Rating from "./Rating";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  padding: 2rem;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 8rem;
  padding: 2rem;
  background-color: var(--color-grey-0);
`;

const ImageGallery = styled.div`
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

const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-primary-1);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-4);
  margin-bottom: 1rem;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Stock = styled.p`
  font-size: 1.2rem;
  color: green;
  margin-bottom: 1rem;
`;

const ColorOptions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
  cursor: pointer;
`;

const SizeOptions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const SizeOption = styled.div`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: 1px solid var(--color-grey-1);
  margin-right: 0.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "var(--color-grey-1)" : "transparent"};
`;

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-grey-1);

  button:first-child {
    border-right: 1px solid var(--color-grey-1);
  }

  button:last-child {
    border-left: 1px solid var(--color-grey-1);
    background-color: var(--color-primary-1);
    color: var(--color-white);
  }
`;

const QuantityButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem;
`;

const Quantity = styled.span`
  font-size: 1.6rem;
  width: 5rem;
  text-align: center;
  margin: 0 0.5rem;
`;

const BuyButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-1);
  color: var(--color-white);
  border: none;
  cursor: pointer;
`;

const WishListButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: transparent;
  color: var(--color-grey-3);
  border: 1px solid var(--color-grey-1);
  cursor: pointer;
`;

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const DeliveryIcon = styled.div`
  margin-right: 0.5rem;
`;

const DeliveryText = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-3);
`;

function ProductView() {
  const { id } = useParams();
  const product = productsData.find((product) => product._id === id);

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleDecreaseQuantity = () =>
    quantity > 1 && setQuantity(quantity - 1);

  return (
    <Container>
      <ProductContainer>
        <ImageGallery>
          <div>
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                src={image}
                onClick={() => setSelectedImage(image)}
                selected={selectedImage === image}
              />
            ))}
          </div>
          <MainImage src={selectedImage} />
        </ImageGallery>
        <ProductDetails>
          <Title>{product.name}</Title>
          <Review>
            <Rating rating={product.rating} totalReviews={product.numReviews} />
          </Review>
          <Stock>In Stock</Stock>
          <Price>${product.price.toFixed(2)}</Price>
          <Description>{product.description}</Description>
          <ColorOptions>
            <span>Colours: </span>
            {product.colors.map((color, index) => (
              <ColorOption
                key={index}
                color={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  border:
                    selectedColor === color
                      ? "2px solid var(--color-black)"
                      : "none",
                }}
              />
            ))}
          </ColorOptions>
          <SizeOptions>
            <span>Size: </span>
            {product.sizes.map((size, index) => (
              <SizeOption
                key={index}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeOption>
            ))}
          </SizeOptions>
          <ProductActions>
            <QuantityControl>
              <QuantityButton onClick={handleDecreaseQuantity}>
                <FaMinus />
              </QuantityButton>
              <Quantity>{quantity}</Quantity>
              <QuantityButton onClick={handleIncreaseQuantity}>
                <FaPlus />
              </QuantityButton>
            </QuantityControl>
            <BuyButton>Buy Now</BuyButton>
            <WishListButton>
              <FaRegHeart />
            </WishListButton>
          </ProductActions>
          <DeliveryInfo>
            <DeliveryIcon>
              <FaTruck />
            </DeliveryIcon>
            <DeliveryText>Free Delivery</DeliveryText>
          </DeliveryInfo>
          <DeliveryInfo>
            <DeliveryIcon>
              <FaUndo />
            </DeliveryIcon>
            <DeliveryText>Free 30 Days Delivery Returns. Details</DeliveryText>
          </DeliveryInfo>
        </ProductDetails>
      </ProductContainer>
    </Container>
  );
}

export default ProductView;
