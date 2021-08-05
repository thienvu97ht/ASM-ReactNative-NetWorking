import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/user";

export const fetchUserData = createAsyncThunk(
  "cart/fetchUserData",
  async () => {
    const data = await userApi.getUser();

    // Return data
    return data;
  }
);

const userSilce = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = userSilce;
export const {} = actions;
export default reducer;
