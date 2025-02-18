import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import adminReducer from "./slices/adminSlice";
import cartReducer from "./slices/cartSlice";
import carMoviesReducer from "./slices/moviesSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
    movies: carMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
