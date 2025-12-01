// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { menuItemApiSlice } from "./api/menuItemApiSlice";
import { categoryApiSlice } from "./api/categoryApiSlice";

export const store = configureStore({
  reducer: {
    [menuItemApiSlice.reducerPath]: menuItemApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApiSlice.middleware)
      .concat(categoryApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
