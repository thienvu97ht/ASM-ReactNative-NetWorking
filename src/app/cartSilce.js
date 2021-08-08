import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../api/carts";

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const data = await cartApi.getAllProductsInCart();

    // Return data
    return data;
  }
);

const cartSilce = createSlice({
  name: "cart",
  initialState: {
    productInCart: [],
  },
  reducers: {
    deleteProductInCart(state, action) {
      const id = action.payload;
      const index = state.productInCart.findIndex((x) => x.id === id);

      state.productInCart.splice(index, 1);
    },

    addProductInCart(state, action) {
      state.productInCart.push(action.payload);
    },

    updateProductInCart(state, action) {
      const { id, quantity } = action.payload;
      const index = state.productInCart.findIndex((x) => x.id === id);

      state.productInCart[index].quantity =
        Number(state.productInCart[index].quantity) + Number(quantity);
    },

    deleteAllProductInCartStore(state, action) {
      state.productInCart = [];
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.productInCart = action.payload;
    },
  },
});

const { actions, reducer } = cartSilce;
export const {
  deleteProductInCart,
  addProductInCart,
  updateProductInCart,
  deleteAllProductInCartStore,
} = actions;
export default reducer;
