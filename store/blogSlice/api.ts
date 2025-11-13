import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Blogs } from "../../features/Blogs/types/blog";
import { API_BASE } from "../../lib/config";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Blogs[], void>({
      query: () => "posts?_limit=10",
      providesTags: (result) =>
        result
          ? [
              ...result.map((post) => ({
                type: "Posts" as const,
                id: post.id,
                author: "John Doe",
              })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    addPost: builder.mutation<Blogs, Partial<Blogs>>({
      query: (body) => ({ url: "posts", method: "POST", body }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = blogApi;
