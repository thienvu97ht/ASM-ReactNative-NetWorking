import axiosClient from "./axiosClient";

const cartApi = {
  getAllProductsInCart: () => {
    const url = `carts/getProductInCart.php`;
    return axiosClient.get(url);
  },

  deleteProductInCart: (id) => {
    const url = `carts/deleteProductInCart.php`;
    return axiosClient.post(url, id);
  },
};

export default cartApi;
