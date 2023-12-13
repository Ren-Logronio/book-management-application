import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
// import { Book, CardChecklist, PeopleFill } from 'react-bootstrap-icons';

type DashType = {
    title: string,
    content: number,
    icon?: string,
}

type DashboardState = {
    dash: DashType[],
    loading: boolean,
    success: boolean,
    error: boolean,
    message: string,
}

const initialState: DashboardState = {
    dash: [],
    loading: false,
    success: false,
    error: false,
    message: "",
};

export const loadDashboard = createAsyncThunk(
    'dash' ,
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/dashboard/');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadDashboard.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
            state.message = "Loading";
        });
        builder.addCase(loadDashboard.fulfilled, (state, { payload } ) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.message = "Dashboard Loaded Successfully";
            state.dash =  payload.dash;
        });
        builder.addCase(loadDashboard.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
            state.message = "Error loading dashboard";
        });
    },
});

export default dashboardSlice.reducer;