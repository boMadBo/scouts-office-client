import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRememberMe: localStorage.getItem('rememberMe') ? Boolean(localStorage.getItem('token')) : false,
};

export const rememberMeSlice = createSlice({
  name: 'rememberMe',
  initialState,
  reducers: {
    saveRememberMe(state) {
      state.isRememberMe = true;
    },
    deleteRememberMe(state) {
      state.isRememberMe = false;
    },
  },
});


export const { saveRememberMe, deleteRememberMe } = rememberMeSlice.actions;
export default rememberMeSlice.reducer;
