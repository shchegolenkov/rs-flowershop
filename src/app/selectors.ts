import { RootState } from './store';

export const selectProducts = (state: RootState) => state.products;

export const selectProduct = (state: RootState) => state.product;

export const selectCart = (state: RootState) => state.cart;

export const selectMessage = (state: RootState) => state.message;

export const selectAuth = (state: RootState) => state.auth;

export const selectProfile = (state: RootState) => state.profile;
