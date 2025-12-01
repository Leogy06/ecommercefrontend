import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { Categories } from "@/types";

export const categoryApiSlice = createApi({
  reducerPath: "categoryApiSlice",
  baseQuery,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Categories[], void>({
      query: () => "/api/category",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
