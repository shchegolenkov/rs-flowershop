import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import productsReducer, {
  fetchProducts,
  setQuery,
  setSort,
  setPage,
  setFilters,
} from './slices/catalog';
import messageReducer from './slices/message';
import productReducer from './slices/product';
import profileReducer from './slices/profile';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  profile: profileReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
};

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(setQuery, setSort, setPage, setFilters),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(fetchProducts());
  },
});

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
