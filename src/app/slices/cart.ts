import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status, UpdateCart } from '../../types/types';
import CartService from '../services/cart.service';

export const createCart = createAsyncThunk('cart/createCart', async (_, thunkAPI) => {
  try {
    const response = await CartService.createCart();
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw thunkAPI.rejectWithValue(error);
  }
});

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (data: UpdateCart, thunkAPI) => {
    try {
      const response = await CartService.updateCart(data);
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

interface CartState {
  status: Status;
}

const initialState: CartState = {
  status: Status.SUCCESS,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCart.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(createCart.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(createCart.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(updateCart.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(updateCart.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(updateCart.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

const { reducer } = cartSlice;
export default reducer;
