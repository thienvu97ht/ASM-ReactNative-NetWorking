import axios from "axios";
import queryString from "query-string";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  baseURL: "http://10.0.2.2:80/project/Authen-JWT/",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");

      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (e) {
      // error reading value
    }
  };

  getToken();

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    console.log(error);
    throw error;
  }
);

export default axiosClient;
