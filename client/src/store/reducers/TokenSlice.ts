<<<<<<< HEAD
import { AppDispatch } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isToken: Cookies.get('rememberMe') ? Boolean(Cookies.get('token')) : false,
=======
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './../store';

const initialState = {
  isToken: false,
>>>>>>> bc9de08 (add styles for auth)
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken(state) {
      state.isToken = true;
    },
    deleteToken(state) {
      state.isToken = false;
    },
  },
});
export const fetchSaveToken = () => async (dispatch: AppDispatch) => {
  dispatch(saveToken());
};

export const fetchDeleteToken = () => async (dispatch: AppDispatch) => {
  dispatch(deleteToken());
};

const { saveToken, deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer;
