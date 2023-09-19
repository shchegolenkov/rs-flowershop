import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: '' };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
