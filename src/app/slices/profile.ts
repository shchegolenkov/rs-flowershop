import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  isDisabledEmail: boolean;
  isDisabledFirstName: boolean;
  isDisabledLastName: boolean;
  isDisabledDateOfBirth: boolean;
}

const initialState: ProfileState = {
  isDisabledEmail: true,
  isDisabledFirstName: true,
  isDisabledLastName: true,
  isDisabledDateOfBirth: true,
};

const messageSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsDisabledEmail: (state) => {
      state.isDisabledEmail = !state.isDisabledEmail;
    },
    setIsDisabledFirstName: (state) => {
      state.isDisabledFirstName = !state.isDisabledFirstName;
    },
    setIsDisabledLastName: (state) => {
      state.isDisabledLastName = !state.isDisabledLastName;
    },
    setIsDisabledDateOfBirth: (state) => {
      state.isDisabledDateOfBirth = !state.isDisabledDateOfBirth;
    },
    setDisabledAllFields: (state) => {
      state.isDisabledEmail = true;
      state.isDisabledFirstName = true;
      state.isDisabledLastName = true;
      state.isDisabledDateOfBirth = true;
    },
  },
});

const { reducer, actions } = messageSlice;

export const {
  setIsDisabledEmail,
  setIsDisabledFirstName,
  setIsDisabledLastName,
  setIsDisabledDateOfBirth,
  setDisabledAllFields,
} = actions;
export default reducer;
