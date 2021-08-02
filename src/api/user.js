import axiosClient from "./axiosClient";

const userApi = {
  getUser: () => {
    const url = `user/getUserProfile.php`;
    return axiosClient.get(url);
  },
};

export default userApi;
