import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const streams = createSlice({
  name: "streams",
  initialState: [],
  reducers: {
    saveStreams: (state, action: PayloadAction<any>) => {
      const streams = action.payload;
      console.log(streams);
      state.concat(streams);
    },
    deleteStreams: (state, action: PayloadAction<any>) => {
      const length = state.length;

      state.splice(0, length);
    },
  }
});

export const { deleteStreams, saveStreams } = streams.actions;
export default streams.reducer;