import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSilce";
import userReducer from "./userSlice";

const rootReducer = {
  products: productsReducer,
  carts: cartReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
