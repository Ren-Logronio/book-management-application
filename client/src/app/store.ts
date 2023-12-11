import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice";
import { authApi } from "./api";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;