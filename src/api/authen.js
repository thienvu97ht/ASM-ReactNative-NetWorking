import axiosClient from "./axiosClient";

const authenApi = {
  checkLogin: (data) => {
    const url = `auth/login.php`;
    return axiosClient.post(url, data);
  },

  register: (data) => {
    const url = `auth/register.php`;
    return axiosClient.post(url, data);
  },

  forgotPassword: (data) => {
    const url = `auth/sendOTP.php`;
    return axiosClient.post(url, data);
  },

  newPassword: (data) => {
    const url = `auth/newPass.php`;
    return axiosClient.post(url, data);
  },
};

export default authenApi;
