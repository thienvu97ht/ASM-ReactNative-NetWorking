import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBills = createAsyncThunk("cart/fetchBills", async () => {
  //   const data = await cartApi.getAllBills();

  // Return data
  return data;
});

const billsSilce = createSlice({
  name: "bills",
  initialState: {
    bills: [],
  },
  reducers: {},
  extraReducers: {
    [fetchBills.fulfilled]: (state, action) => {
      //   state.productInbills = action.payload;
    },
  },
});

const { actions, reducer } = billsSilce;
export const {} = actions;
export default reducer;
