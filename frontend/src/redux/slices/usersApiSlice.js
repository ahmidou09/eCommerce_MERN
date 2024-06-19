import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}${USERS_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}${USERS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BASE_URL}${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
