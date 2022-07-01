import constants from 'constants/index';
import axiosClient from './axiosClient';

const USER_API_URL = '/user';

const userApi = {
  //UPDATE user
  putUpdateUser: (value) => {
    const token = localStorage.getItem(constants.ACCESS_TOKEN_KEY)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const url = USER_API_URL ;
    return axiosClient.patch(url, value, config);
  },
};

export default userApi;
