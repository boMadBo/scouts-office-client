import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchFetching(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { searchFetching } = searchSlice.actions;
export default searchSlice.reducer;
