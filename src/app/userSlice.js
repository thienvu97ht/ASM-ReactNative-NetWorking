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

export const updateProfile = createAsyncThunk(
  "cart/updateProfile",
  async (newProfile) => {
    const data = await userApi.updateProfile(newProfile);

    // Return data
    return data;
  }
);

const userSilce = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    updatePhone(state, action) {
      state.user.phone = action.payload;
    },

    updateAddress(state, action) {
      state.user.address = action.payload;
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.user = action.payload;
    },

    [updateProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = userSilce;
export const { updatePhone, updateAddress } = actions;
export default reducer;
