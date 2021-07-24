import axiosClient from "./axiosClient";

const authenApi = {
  checkLogin: (data) => {
    const url = `/login.php`;
    return axiosClient.post(url, data);
  },

  register: (data) => {
    const url = `/register.php`;
    return axiosClient.post(url, data);
  },

  forgotPassword: (data) => {
    const url = `/sendOTP.php`;
    return axiosClient.post(url, data);
  },

  newPassword: (data) => {
    const url = `/newPass.php`;
    return axiosClient.post(url, data);
  },
};

export default authenApi;
