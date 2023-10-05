<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
import { AppDispatch } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isToken: Cookies.get('rememberMe') ? Boolean(Cookies.get('token')) : false,
<<<<<<< HEAD
=======
=======
import { AppDispatch } from '@/store/store';
>>>>>>> bda062a (edit server for ts)
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
<<<<<<< HEAD
  isToken: false,
>>>>>>> bc9de08 (add styles for auth)
=======
  isToken: Cookies.get('rememberMe') ? Boolean(Cookies.get('token')) : false,
>>>>>>> bda062a (edit server for ts)
=======
>>>>>>> main
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
