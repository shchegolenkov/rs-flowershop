import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import CatalogService from '../services/catalog.service';
import { Status, IPageQueryResult } from '../../types/types';
import { RootState } from '../store';
import { ITEMS_PER_PAGE } from '../../constants/const';

export const fetchProducts = createAsyncThunk(
  'catalog/allProducts',
  async (pageNumber: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const query = state.products.query ? state.products.query : '';
      const response = await CatalogService.getProducts(pageNumber, query);
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

interface CatalogState {
  queryResult: IPageQueryResult | undefined | null;
  status: Status;
  query: string;
  pages: number;
}

const initialState: CatalogState = {
  queryResult: null,
  status: Status.LOADING,
  query: '',
  pages: 1,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.queryResult = null;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.queryResult = action.payload;
      state.pages = Math.ceil((action.payload?.total || 1) / ITEMS_PER_PAGE);
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.queryResult = null;
      state.pages = 1;
    });
  },
});

const { reducer, actions } = catalogSlice;
export const { setQuery } = actions;
export default reducer;
