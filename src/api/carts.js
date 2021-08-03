import axiosClient from "./axiosClient";

const cartApi = {
  getAllProductsInCart: () => {
    const url = `carts/getProductInCart.php`;
    return axiosClient.get(url);
  },
};

export default cartApi;
