import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLight: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isLight = !state.isLight;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
