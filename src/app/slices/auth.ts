import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { CustomerData } from '../../types/types';
const user = JSON.parse(localStorage.getItem('user') as string);

import AuthService from '../services/auth.service';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: CustomerData, thunkAPI) => {
    try {
      const response = await AuthService.registerUser(data);
      if (response) {
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            (error.response.data as { message: string }).message) ||
          (error as unknown as string) ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(null);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: Pick<CustomerData, 'email' | 'password'>, thunkAPI) => {
    try {
      const response = await AuthService.loginUser(data);
      if (response) return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            (error.response.data as { message: string }).message) ||
          (error as unknown as string) ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(null);
      }
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await AuthService.logoutUser();
    localStorage.removeItem('accessToken');
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
});

export const tokenIntrospection = createAsyncThunk('auth/tokenIntrospection', async () => {
  try {
    const response = await AuthService.tokenIntrospection();
    return response;
  } catch (error) {
    console.log('tokenIntrospection err', error);
  }
});

interface AuthState {
  isLoggedIn: boolean;
  user: CustomerData | null;
}

const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(tokenIntrospection.fulfilled, (state, action) => {
        if (action.payload.active) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
      })
      .addCase(tokenIntrospection.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
