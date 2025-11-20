// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { menuItemApiSlice } from "./api/menuItemApiSlice";

export const store = configureStore({
  reducer: {
    [menuItemApiSlice.reducerPath]: menuItemApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuItemApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
