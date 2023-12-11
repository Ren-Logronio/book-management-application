import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface Credentials {
  email: string;
  password: string;
}

interface StateType {
  loading: boolean;
  user: string | null;
  error: any;
  success: boolean;
  token: any;
}

const initialState: StateType = {
  loading: false,
  user: localStorage.getItem('user'),
  token: '',
  error: '',
  success: false,
}

const backendURL = import.meta.env.VITE_API_URL;

export const userLogin = createAsyncThunk(
  'auth/login', 
  async ({ email, password }: Credentials, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/api/auth/login`,
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem('user', data.user)

      return data
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user') // delete token from storage
      state.loading = false
      state.user = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.user = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload,
        state.token = payload.token
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;