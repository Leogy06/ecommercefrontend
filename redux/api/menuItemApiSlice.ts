// src/redux/api/apiSlice.ts
import { MenuItem } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const menuItemApiSlice = createApi({
  reducerPath: "menuItemApi", // optional alias
  baseQuery,
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query<MenuItem[], string>({
      query: (categoryId) => `/api/menuitem?categoryId=${categoryId}`, // translates to /api/users
      providesTags: ["MenuItems"],
    }),
    // add other endpoints here
  }),
});

// Export the auto-generated hooks
export const { useGetMenuItemsQuery } = menuItemApiSlice;
