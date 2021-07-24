import axiosClient from "./axiosClient";

const userApi = {
  getUser: () => {
    const url = `/getOne.php`;
    return axiosClient.get(url);
  },
};

export default userApi;
