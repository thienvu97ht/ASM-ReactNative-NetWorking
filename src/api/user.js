import axiosClient from "./axiosClient";

const userApi = {
  getUser: () => {
    const url = `user/getOne.php`;
    return axiosClient.get(url);
  },
};

export default userApi;
