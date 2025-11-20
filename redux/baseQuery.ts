import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// Wrap the baseQuery to handle 401 responses
export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
    credentials: "include", // allows sending cookies (if using JWT cookies)
    prepareHeaders: (headers) => {
      // Optional: Add auth token if stored in localStorage/sessionStorage
      // const token = localStorage.getItem("access_token");
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  return result;
};
