import { message } from 'antd';
import axios from 'axios';
import queryString from 'query-string';

const baseURL = "http://localhost:8080";

//Set up default config for http request
// Tao ra 1 object dung chung cho moi noi can import no
const axiosClient = axios.create({
  baseURL: baseURL + '/api',
  headers: {
    'content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token-camera') 
  },
  //query string dung de parse url thanh json thay cho axios (tranh tuong hop null url)
  paramsSerializer: (params) => queryString.stringify(params),
});

//handle request
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  },
);

//handle response
axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    message.error(error.message)
    throw error;
  },
);

export default axiosClient;
