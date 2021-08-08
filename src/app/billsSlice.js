import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import billsApi from "../api/bills";

export const fetchBills = createAsyncThunk("cart/fetchBills", async () => {
  const data = await billsApi.getAllBills();

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

      console.log(action.payload);
    },
  },
});

const { actions, reducer } = billsSilce;
export const {} = actions;
export default reducer;
