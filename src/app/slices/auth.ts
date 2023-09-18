import axios, { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { setCartData } from './cart';
import { CustomerData, Logout, ThunkAPI, User } from '../../types/types';
const user = JSON.parse(localStorage.getItem('user') as string);
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
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
        if (response.data.cart) {
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
          thunkAPI.dispatch(setCartData(response.data.cart));
        }
        return response.data.customer;
      }
    } catch (error) {
      getErrorMessage(error, thunkAPI);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (data: Logout, thunkApi) => {
  try {
    await thunkApi.dispatch(revokeRefreshToken(data.refreshToken as string));
    await AuthService.logoutUser(data.accessToken);
    thunkApi.dispatch(setCartData(null));
    thunkApi.dispatch(resetCatalogState());
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
});

export const revokeRefreshToken = createAsyncThunk(
  'auth/revokeRefreshToken',
  async (revokeRefreshToken: string) => {
    try {
      await AuthService.revokeRefreshToken(revokeRefreshToken);
      return true;
    } catch (error) {
      console.error('Error revoke Refresh Token:', error);
      return false;
    }
  }
);

export const tokenIntrospection = createAsyncThunk(
  'auth/tokenIntrospection',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.tokenIntrospection();
      if (!response.active) {
        thunkApi.dispatch(refreshAccessToken(refreshToken as string));
      }
      return response;
    } catch (error) {
      console.log('tokenIntrospection err', error);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshToken: string, thunkApi) => {
    try {
      const response = await AuthService.refreshAccessToken(refreshToken);
      localStorage.setItem('accessToken', response.access_token);
      return response;
    } catch (error) {
      localStorage.clear();
      thunkApi.dispatch(resetCatalogState());
      console.log('Refresh Access Token error', error);
    }
  }
);

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
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = user
  ? { isLoggedIn: true, user, accessToken: accessToken || null, refreshToken: refreshToken || null }
  : {
      isLoggedIn: false,
      user: null,
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetCatalogState: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
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
        state.accessToken = localStorage.getItem('accessToken');
        state.refreshToken = localStorage.getItem('refreshToken');
      })
      .addCase(loginUser.rejected, (state) => {
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
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.accessToken = localStorage.getItem('accessToken');
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
export const { resetCatalogState } = authSlice.actions;
export default reducer;
