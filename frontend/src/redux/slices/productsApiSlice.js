import { apiSlice } from "./apiSlice";
import { BASE_URL, PRODUCTS_URL, UPLOAD_URL } from "../../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, category, pageNumber }) => ({
        url: `${BASE_URL}${PRODUCTS_URL}`,
        method: "GET",
        params: { keyword, category, pageNumber },
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
    uploadSingleProductImage: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}${UPLOAD_URL}/single`,
        method: "POST",
        body: data,
      }),
    }),
    uploadMultipleProductImages: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}${UPLOAD_URL}/multiple`,
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
    reviewProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${id}/reviews`,
        method: "POST",
        body: data,
      }),
    }),
    myReviews: builder.query({
      query: () => ({
        url: `${BASE_URL}${PRODUCTS_URL}/myreviews`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}${PRODUCTS_URL}/top`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useUploadSingleProductImageMutation,
  useUploadMultipleProductImagesMutation,
  useReviewProductMutation,
  useGetMyReviewsQuery,
  useMyReviewsQuery,
  useGetTopProductsQuery,
} = productsApiSlice;
