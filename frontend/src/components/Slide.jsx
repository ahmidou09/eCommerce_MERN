import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SwipeCarousel from "./SwipeCarousel";

const SlideContainer = styled.div`
  width: 80%;
  padding-top: 2rem;
`;

function Slide() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    getProducts();
  });
  return (
    <SlideContainer>
      <SwipeCarousel slideData={products} />
    </SlideContainer>
  );
}

export default Slide;
