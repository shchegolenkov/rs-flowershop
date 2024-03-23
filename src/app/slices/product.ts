import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ProductService from '../services/product.service';

import { Product, Status } from '@/types/types';

export const fetchProduct = createAsyncThunk(
  'catalog/product',
  async (productKey: string, thunkAPI) => {
    try {
      const response = await ProductService.getProduct(productKey);
      return response.data || null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface ProductState {
  status: Status;
  product: Product | null;
}

const initialState: ProductState = {
  status: Status.LOADING,
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = Status.LOADING;
      state.product = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = Status.ERROR;
      state.product = null;
    });
  },
});

const { reducer } = productSlice;

export default reducer;
