import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CustomerData, ProfileForm, DelAddress, AddShipBillProperty } from '../../types/types';

import ProfileService from '../services/profile.service';
import { setMessage } from './message';

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (data: CustomerData, thunkAPI) => {
    try {
      const response = await ProfileService.updateUser(data);
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

export const updateUserAddress = createAsyncThunk(
  'profile/updateUserAddress',
  async (data: ProfileForm, thunkAPI) => {
    try {
      const response = await ProfileService.updateUserAddress(data);
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

export const addAddress = createAsyncThunk(
  'profile/addAddress',
  async (data: ProfileForm, thunkAPI) => {
    try {
      const response = await ProfileService.addAddress(data);
      if (response) {
        localStorage.setItem(
          'addAddressId',
          response.data.addresses[response.data.addresses.length - 1].id
        );
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

export const updateBillingAddress = createAsyncThunk(
  'profile/updateBillingAddress',
  async (data: ProfileForm, thunkAPI) => {
    try {
      const response = await ProfileService.updateBillingAddress(data);
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

export const updateShippingAddress = createAsyncThunk(
  'profile/updateShippingAddress',
  async (data: ProfileForm, thunkAPI) => {
    try {
      const response = await ProfileService.updateShippingAddress(data);
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

export const addShippingBillingAddresses = createAsyncThunk(
  'profile/addShippingBillingAddresses',
  async (data: AddShipBillProperty, thunkAPI) => {
    try {
      const response = await ProfileService.addShippingBillingAddresses(data);
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

export const setDefaultShippingAddress = createAsyncThunk(
  'profile/setDefaultShippingAddress',
  async (data: ProfileForm, thunkAPI) => {
    try {
      const response = await ProfileService.setDefaultShippingAddress(data);
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

export const setDefaultBillingAddress = createAsyncThunk(
  'profile/setDefaultBillingAddress',
  async (data: ProfileForm, thunkAPI) => {
    try {
      const response = await ProfileService.setDefaultBillingAddress(data);
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

export const removeAddress = createAsyncThunk(
  'profile/removeAddress',
  async (data: DelAddress, thunkAPI) => {
    try {
      const response = await ProfileService.removeAddress(data);
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

interface ProfileState {
  isDisabledEmail: boolean;
  isDisabledFirstName: boolean;
  isDisabledLastName: boolean;
  isDisabledDateOfBirth: boolean;
}

const initialState: ProfileState = {
  isDisabledEmail: true,
  isDisabledFirstName: true,
  isDisabledLastName: true,
  isDisabledDateOfBirth: true,
};

const messageSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsDisabledEmail: (state) => {
      state.isDisabledEmail = !state.isDisabledEmail;
    },
    setIsDisabledFirstName: (state) => {
      state.isDisabledFirstName = !state.isDisabledFirstName;
    },
    setIsDisabledLastName: (state) => {
      state.isDisabledLastName = !state.isDisabledLastName;
    },
    setIsDisabledDateOfBirth: (state) => {
      state.isDisabledDateOfBirth = !state.isDisabledDateOfBirth;
    },
    setDisabledAllFields: (state) => {
      state.isDisabledEmail = true;
      state.isDisabledFirstName = true;
      state.isDisabledLastName = true;
      state.isDisabledDateOfBirth = true;
    },
  },
});

const { reducer, actions } = messageSlice;

export const {
  setIsDisabledEmail,
  setIsDisabledFirstName,
  setIsDisabledLastName,
  setIsDisabledDateOfBirth,
  setDisabledAllFields,
} = actions;
export default reducer;
