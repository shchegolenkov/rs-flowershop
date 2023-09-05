import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import CatalogService from '../services/catalog.service';
import { Status, IPageQueryResult, Categories } from '../../types/types';
import { RootState } from '../store';
import { ITEMS_PER_PAGE } from '../../constants/const';

export const fetchProducts = createAsyncThunk('catalog/allProducts', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const query = state.products.query;
    const sort = state.products.sort;
    const pageNumber = state.products.page;
    const filters = state.products.filters;
    const response = await CatalogService.getProducts(pageNumber, query, sort, filters);
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw thunkAPI.rejectWithValue(error);
  }
});

export const fetchProduct = createAsyncThunk(
  'catalog/product',
  async (productKey: string, thunkAPI) => {
    try {
      const response = await CatalogService.getProduct(productKey);
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
  page: number;
  sort: string;
  filters: string[];
  sizes: string;
  prices: string;
  discount: string;
  category: string;
}

const initialState: CatalogState = {
  queryResult: null,
  status: Status.LOADING,
  query: '',
  pages: 1,
  page: 1,
  sort: '',
  sizes: '',
  prices: 'variants.prices:exists',
  discount: '',
  filters: ['variants.prices:exists'],
  category: '',
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
    setFilters: (state) => {
      state.filters = [state.sizes, state.prices, state.discount, state.category].filter(
        (item) => item.length > 0
      );
      state.page = 1;
    },
    setSizes: (state, action: PayloadAction<string>) => {
      state.sizes = `variants.attributes.size.${action.payload}`;
    },
    resetSizes: (state) => {
      state.sizes = '';
    },
    setPrices: (state, action: PayloadAction<string>) => {
      state.prices = `variants.price.centAmount:range ${action.payload}`;
    },
    resetPrices: (state) => {
      state.prices = 'variants.prices:exists';
    },
    setDiscount: (state) => {
      state.discount = 'variants.attributes.discount:true';
    },
    resetDiscount: (state) => {
      state.discount = '';
    },
    resetCategory: (state) => {
      state.category = '';
    },
    setCategory: (state, action: PayloadAction<Categories>) => {
      state.category = `categories.id:${action.payload}`;
    },
    resetCatalogState: () => initialState,
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
export const {
  setQuery,
  setSort,
  setPage,
  resetCatalogState,
  setSizes,
  resetSizes,
  setPrices,
  resetPrices,
  setDiscount,
  resetDiscount,
  setFilters,
  setCategory,
  resetCategory,
} = actions;
export default reducer;
