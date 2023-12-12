import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  user: string | null;
  error: any;
  success: boolean;
  token: any;
  message: string;
}

const initialState: AuthState = {
  loading: false,
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
  error: '',
  success: false,
  message: '',
}

const baseURL = "/api/auth";

export const userLogin = createAsyncThunk(
  'auth/login', 
  async ({ email, password }: Credentials, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      console.log(`Initiating login`);
      console.log(`${email} ${password}`);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${baseURL}/login`,
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem('user', JSON.stringify(data._doc))
      localStorage.setItem('token', data.token)

      return data
    } catch (err: any) {
      console.log(err);
      // return custom error message from API if any
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data)
      } else {
        return rejectWithValue(err.message)
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      console.log("logging out");
      localStorage.removeItem('user') // delete token from storage
      localStorage.removeItem('token') // delete token from storage
      state.token = null
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

export const { userLogout, setCredentials } = authSlice.actions;

export default authSlice.reducer;