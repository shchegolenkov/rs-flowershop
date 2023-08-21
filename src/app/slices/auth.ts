import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data as { message: string }).message) ||
        (error as string) ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

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
  extraReducers: {
    [registerUser.fulfilled]: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = false;
    },
    [registerUser.rejected]: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
