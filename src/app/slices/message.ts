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
    setMessage: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
