import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import favoritesReducer from "./favoritesSilce";

const rootReducer = {
  products: productsReducer,
  favorites: favoritesReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
