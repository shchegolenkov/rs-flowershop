import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import CatalogService from '../services/catalog.service';
import { Status, IPageQueryResult } from '../../types/types';
import { RootState } from '../store';
import { ITEMS_PER_PAGE } from '../../constants/const';

export const fetchProducts = createAsyncThunk('catalog/allProducts', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const query = state.products.query;
    const sort = state.products.sort;
    const pageNumber = state.products.page;
    const response = await CatalogService.getProducts(pageNumber, query, sort);
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw thunkAPI.rejectWithValue(error);
  }
});

interface CatalogState {
  queryResult: IPageQueryResult | undefined | null;
  status: Status;
  query: string;
  pages: number;
  page: number;
  sort: string;
}

const initialState: CatalogState = {
  queryResult: null,
  status: Status.LOADING,
  query: '',
  pages: 1,
  page: 1,
  sort: '',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetCatalogState: (state) => {
      state.query = '';
      state.sort = '';
      state.page = 1;
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
      state.page = 1;
      state.sort = '';
    });
  },
});

const { reducer, actions } = catalogSlice;
export const { setQuery, setSort, setPage, resetCatalogState } = actions;
export default reducer;
