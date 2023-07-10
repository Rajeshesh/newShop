import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("shopMode") || "dark",
  font: localStorage.getItem("shopFont") || "'Expletus Sans', cursive",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      localStorage.setItem(
        "shopMode",
        state.mode === "light" ? "dark" : "light"
      );
      state.mode = localStorage.getItem("shopMode");
    },
    setModeLike: (state, actions) => {
      localStorage.setItem("shopMode", actions.payload);
      state.mode = actions.payload;
    },
    setFont: (state, actions) => {
      localStorage.setItem("shopFont", actions.payload);
      state.font = actions.payload;
    },
  },
});

export const { setMode, setModeLike, setFont } = globalSlice.actions;

export default globalSlice.reducer;
