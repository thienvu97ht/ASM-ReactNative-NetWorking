import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSilce";

const rootReducer = {
  products: productsReducer,
  carts: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
