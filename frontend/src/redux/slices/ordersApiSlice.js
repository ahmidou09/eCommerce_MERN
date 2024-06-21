import { apiSlice } from "./apiSlice";
import { BASE_URL, ORDERS_URL, PAYPAL_URL } from "../../constants";

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
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${BASE_URL}${ORDERS_URL}/myorders`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${BASE_URL}${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: `${BASE_URL}${PAYPAL_URL}`,
        method: "GET",
      }),
    }),
    getOrders: builder.query({
      query: ({ pageNumber }) => ({
        url: `${BASE_URL}${ORDERS_URL}`,
        method: "GET",
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useUpdateOrderToDeliveredMutation,
} = ordersApiSlice;
