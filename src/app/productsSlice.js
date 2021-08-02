import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
});

const { reducer } = productsSlice;
export default reducer;
