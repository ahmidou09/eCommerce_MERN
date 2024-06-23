import React from "react";
import Products from "./Products";
import { useParams } from "react-router-dom";
import Meta from "../ui/Meta";

const Category = () => {
  const { category } = useParams();
  return (
    <>
      <Meta title={`${category}`} />
      <Products category={category} />
    </>
  );
};

export default Category;
