import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice";
import BookReducer from "../slices/BookSlice";
import ReviewReducer from "../slices/ReviewSlice";
import { useDispatch } from "react-redux";
import { authApi } from "./api";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        book: BookReducer,
        review: reviewReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;