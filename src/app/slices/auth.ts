import axios, { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { CustomerData, ThunkAPI, User } from '../../types/types';
const user = JSON.parse(localStorage.getItem('user') as string);
import AuthService from '../services/auth.service';

const getErrorMessage = (error: AxiosError | unknown, thunkAPI: ThunkAPI) => {
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
};

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
      getErrorMessage(error, thunkAPI);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: Pick<CustomerData, 'email' | 'password'>, thunkAPI) => {
    try {
      const response = await AuthService.loginUser(data);
      if (response) {
        localStorage.setItem('userId', response.data.customer.id);
        localStorage.setItem('user', JSON.stringify(response.data.customer));
        localStorage.setItem('cart', JSON.stringify(response.data.cart));
        return response.data.customer;
      }
    } catch (error) {
      getErrorMessage(error, thunkAPI);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await AuthService.logoutUser();
    localStorage.clear();
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

export const getUser = createAsyncThunk('auth/getUser', async () => {
  try {
    const response = await AuthService.getUser();
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log('Get user error:', error);
  }
});

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
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
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
