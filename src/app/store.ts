import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import profileReducer from './slices/profile';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  profile: profileReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
