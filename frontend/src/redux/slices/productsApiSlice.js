import { apiSlice } from "./apiSlice";
import { BASE_URL, PRODUCTS_URL } from "../../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}${PRODUCTS_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${BASE_URL}${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice;
