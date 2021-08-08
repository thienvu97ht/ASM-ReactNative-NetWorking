import axiosClient from "./axiosClient";

const userApi = {
  getUser: () => {
    const url = `user/getUserProfile.php`;
    return axiosClient.get(url);
  },

  updateUserPhone: (data) => {
    const url = `user/updateUserPhone.php`;
    return axiosClient.post(url, data);
  },

  updateUserAddress: (data) => {
    const url = `user/updateUserAddress.php`;
    return axiosClient.post(url, data);
  },
};

export default userApi;
