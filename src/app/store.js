import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";

const rootReducer = {
  products: productsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
