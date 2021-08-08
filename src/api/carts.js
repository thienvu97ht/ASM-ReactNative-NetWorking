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

  addProductToCart: (data) => {
    const url = `carts/addProductToCart.php`;
    return axiosClient.post(url, data);
  },

  updateProductInCart: (data) => {
    const url = `carts/updateProductInCart.php`;
    return axiosClient.post(url, data);
  },

  deleteAllProductInCart: () => {
    const url = `carts/deleteAllProductInCart.php`;
    return axiosClient.post(url);
  },
};

export default cartApi;
