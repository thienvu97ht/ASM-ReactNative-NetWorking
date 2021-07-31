import axiosClient from "./axiosClient";

const productApi = {
  getAllProducts: () => {
    const url = `products/getAllProducts.php`;
    return axiosClient.get(url);
  },

  getProductById: (id) => {
    const url = `products/getProductById.php`;
    return axiosClient.post(url, id);
  },
};

export default productApi;
