import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../api/carts";

export const fetchProductsInCart = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const data = await cartApi.getAllProductsInCart();

    // Return data
    return data;
  }
);

export const deleteProductsInCart = createAsyncThunk(
  "cart/deleteProductsInCart",
  async () => {
    await cartApi.deleteAllProductInCart();
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
  },
  extraReducers: {
    [fetchProductsInCart.fulfilled]: (state, action) => {
      state.productInCart = action.payload;
    },

    [deleteProductsInCart.fulfilled]: (state, action) => {
      state.productInCart = [];
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
