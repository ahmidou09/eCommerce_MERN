import { apiSlice } from "./apiSlice";
import { BASE_URL, ORDERS_URL } from "../../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${BASE_URL}${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${BASE_URL}${ORDERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    keepUnusedDataFor: 5,
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
