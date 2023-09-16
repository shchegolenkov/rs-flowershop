import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, Status, UpdateCart } from '../../types/types';
import CartService from '../services/cart.service';
const cart = JSON.parse(localStorage.getItem('cart') as string) as Cart;

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

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (data: UpdateCart[], thunkAPI) => {
    try {
      const response = await CartService.clearCart(data);
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
  cartData: Cart | null;
}

const initialState: CartState = {
  status: Status.SUCCESS,
  cartData: cart ? cart : null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
  },
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

    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.cartData = action.payload;
    });

    builder.addCase(updateCart.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(clearCart.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.cartData = action.payload;
    });

    builder.addCase(clearCart.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

const { reducer } = cartSlice;
export const { setCartData } = cartSlice.actions;
export default reducer;
