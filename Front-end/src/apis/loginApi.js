import constants from 'constants/index';
import axiosClient from './axiosClient';

const LOGIN_API_ENDPOINT = '/user';

const loginApi = {
  // api: đăng nhập
  postLogin: (account) => {
    const url = LOGIN_API_ENDPOINT + '/login';
    return axiosClient.post(url, account);
  },

  // api: authentication
  getAuth: () => {
    const token = localStorage.getItem(constants.ACCESS_TOKEN_KEY)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const url = LOGIN_API_ENDPOINT + '/info';
    return axiosClient.get(url, config);
  },
};

export default loginApi;
