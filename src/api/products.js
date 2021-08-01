import axiosClient from "./axiosClient";

const productApi = {
  getAllProductsByUsername: () => {
    const url = `products/getAllProductByUsername.php`;
    return axiosClient.get(url);
  },

  getProductById: (id) => {
    const url = `products/getProductById.php`;
    return axiosClient.post(url, id);
  },
};

export default productApi;
