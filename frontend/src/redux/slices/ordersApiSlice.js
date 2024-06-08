import { apiSlice } from "./apiSlice";
import { BASE_URL, ORDERS_URL } from "../../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${BASE_URL}${ORDERS_URL}`,
        method: "POST",
        body: {
          ...order,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
