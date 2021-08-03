import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite(state, action) {},

    deleteFavorite(state, action) {},
  },
});

const { actions, reducer } = favoritesSlice;
export const { addFavorite, deleteFavorite } = actions;
export default reducer;
