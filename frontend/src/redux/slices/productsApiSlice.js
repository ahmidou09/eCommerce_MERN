import { apiSlice } from "./apiSlice";
import { BASE_URL, PRODUCTS_URL } from "../../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}${PRODUCTS_URL}`,
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
