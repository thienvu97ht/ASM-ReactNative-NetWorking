import axiosClient from "./axiosClient";

const favoriteApi = {
  getAllFavorites: () => {
    const url = `favorites/getFavorites.php`;
    return axiosClient.get(url);
  },

  deleteFavorite: (id) => {
    const url = `favorites/deleteFavorite.php`;
    return axiosClient.post(url, id);
  },

  addFavorite: (id) => {
    const url = `favorites/addFavorite.php`;
    return axiosClient.post(url, id);
  },
};

export default favoriteApi;
