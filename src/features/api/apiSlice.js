// Import the RTK Query methods from the React-specific entry point that automatically generates hooks corresponding to the defined endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with `REACT_APP_API_URL`
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getUser` endpoint is a "query" operation that returns data
    getSigninUser: builder.mutation({
      // The URL for the request is 'REACT_APP_API_URL/signin'
      query: ({ email, password, token }) => {
        return {
          url: '/signin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: { email, password },
        };
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
    }),
    getSigninUserProfile: builder.mutation({
      query: ({ userId, token }) => {
        return {
          url: `/profile/${userId}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        };
      },
    }),
    getRegisterUser: builder.mutation({
      query: (registerData) => {
        return {
          url: '/register',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: registerData,
        };
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
    }),
    getUpdateUserProfile: builder.mutation({
      query: ({ data, userId, token }) => {
        return {
          url: `/profile/${userId}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: { formInput: data },
        };
      },
    }),
    deleteLogoutUserToken: builder.mutation({
      query: ({ userId, token }) => {
        return {
          url: '/logout',
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { userId, token },
        };
      },
    }),
    getApiCallData: builder.mutation({
      query: ({ imageUrl, token }) => {
        return {
          url: 'imageurl',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: { url: imageUrl },
        };
      },
    }),
    updateUserImageEntries: builder.mutation({
      query: ({ userId, token }) => {
        return {
          url: 'image',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: { id: userId },
        };
      },
    }),
  }),
});

// Export the auto-generated hook for the query endpoints above
export const {
  useGetSigninUserMutation,
  useGetSigninUserProfileMutation,
  useGetRegisterUserMutation,
  useGetUpdateUserProfileMutation,
  useDeleteLogoutUserTokenMutation,
  useGetApiCallDataMutation,
  useUpdateUserImageEntriesMutation,
} = apiSlice;
