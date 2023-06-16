import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  font: "'Expletus Sans', cursive",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setModeLike: (state, actions) => {
      state.mode = actions.payload;
    },
    setFont: (state, actions) => {
      state.font = actions.payload;
    },
  },
});

export const { setMode, setModeLike, setFont } = globalSlice.actions;

export default globalSlice.reducer;