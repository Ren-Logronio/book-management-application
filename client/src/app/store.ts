import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice";
import BookReducer from "../slices/BookSlice";
import DashboardReducer from "../slices/DashboardSlice";
import ReviewReducer from "../slices/x";
import { useDispatch } from "react-redux";
import { authApi } from "./api";


export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        book: BookReducer,
        dashboard: DashboardReducer,
        [authApi.reducerPath]: authApi.reducer,
    }, 
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;