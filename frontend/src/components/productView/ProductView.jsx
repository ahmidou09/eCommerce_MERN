import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGetProductByIdQuery } from "../../redux/slices/productsApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/slices/wishListSlice";
import ImageGallery from "./ImageGallery";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import DeliveryInfo from "./DeliveryInfo";
import ProductReviews from "./ProductReviews";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../ui/Errors";

function ProductView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleDecreaseQuantity = () =>
    quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: Number(quantity),
        selectedColor,
        selectedSize,
      })
    );
    navigate("/cart");
  };

  const { wishListItems } = useSelector((state) => state.wishList);

  const handleAddToWishList = (product) => {
    if (wishListItems.find((x) => x._id === product._id)) {
      dispatch(removeFromWishList(product._id));
    } else {
      dispatch(addToWishList(product));
    }
  };

  const isProductInWishList = (productId) => {
    return wishListItems.some((item) => item._id === productId);
  };

  return (
    <Container>
      {isLoading ? (
        <Skeleton count={5} height={50} style={{ marginBottom: "2rem" }} />
      ) : isError ? (
        <Errors message="An error occurred" style={{ height: "65vh" }} />
      ) : (
        <>
          <ProductContainer>
            <ImageGallery
              images={product.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <ProductDetailsContainer>
              <ProductDetails
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                setSelectedColor={setSelectedColor}
                setSelectedSize={setSelectedSize}
              />
              {product.countInStock > 0 && (
                <ProductActions
                  product={product}
                  quantity={quantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleAddToCart={handleAddToCart}
                  handleAddToWishList={handleAddToWishList}
                  isProductInWishList={isProductInWishList}
                  setQuantity={setQuantity}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
              )}
              <DeliveryInfo />
            </ProductDetailsContainer>
          </ProductContainer>
          <ProductReviewsContainer>
            <ProductReviews productId={id} />
          </ProductReviewsContainer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 65vh;
  padding: 2rem;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 8rem;
  padding: 2rem;
  background-color: var(--color-grey-0);
`;

const ProductDetailsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProductReviewsContainer = styled.div`
  margin-top: 2rem;
`;

export default ProductView;
