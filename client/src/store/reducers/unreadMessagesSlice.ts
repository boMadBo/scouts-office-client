import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const unreadMessagesSlice = createSlice({
  name: 'unreadMessages',
  initialState,
  reducers: {
    unreadMessagesFetching(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { unreadMessagesFetching } = unreadMessagesSlice.actions;
export default unreadMessagesSlice.reducer;
