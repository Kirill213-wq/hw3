import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../data/posts.ts";

interface AuthResponse {
  id: number;
  email: string;
}

interface AuthRequest {
  email: string;
  password: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),

    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query<AuthResponse, void>({
      query: () => "auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
} = baseApi;