import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import profileReducer from './slices/profile';
import productReducer from './slices/product';
import productsReducer, {
  fetchProducts,
  setQuery,
  setSort,
  setPage,
  setFilters,
} from './slices/catalog';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  profile: profileReducer,
  products: productsReducer,
  product: productReducer,
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
