import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_API_URL;

export interface Review {
    user: {} | any;
    book: {} | any;
    review: string;
    rating: Number;
}

export interface ReviewList {
    reviews: Review[];
    success: boolean;
    loading: boolean;
    error: boolean;
    message: string;
};

const initialState: ReviewList = {
    reviews: [],
    success: false,
    loading: false,
    error: false,
    message: "",
};

const getReviews = createAsyncThunk(
    'review/book',
    async (bookId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${backendURL}/api/reviews/book/${bookId}`
            );
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
)

const addReview = createAsyncThunk(
    'review/add',
    async ({ book, review, rating }: Review, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${backendURL}/api/reviews/add`,
                { book , review, rating }
            );
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
);

const deleteReview = createAsyncThunk(
    'review/delete',
    async (reviewId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(
                `${backendURL}/api/reviews/delete/${reviewId}`
            );
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
)

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    },
});

export default reviewSlice.reducer;
