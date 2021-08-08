import axiosClient from "./axiosClient";

const billsApi = {
  getAllBills: () => {
    const url = `bills/getBills.php`;
    return axiosClient.get(url);
  },

  addBills: (data) => {
    const url = `bills/addBills.php`;
    return axiosClient.post(url, data);
  },

  sendBill: (data) => {
    const url = `bills/sendBill.php`;
    return axiosClient.post(url, data);
  },
};

export default billsApi;
