import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PushSlice {
  idSender: string | undefined;
  text: string | undefined;
}

const initialState: PushSlice = {
  idSender: '',
  text: '',
};

export const pushSlice = createSlice({
  name: 'push',
  initialState,
  reducers: {
    pushFetching(state, action: PayloadAction<PushSlice>) {
      state.idSender = action.payload.idSender;
      state.text = action.payload.text;
    },
  },
});

export const { pushFetching } = pushSlice.actions;
export default pushSlice.reducer;
