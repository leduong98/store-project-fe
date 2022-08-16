import axiosClient from './axiosClient';

const ACCOUNT_API_ENDPOINT = '/user';

const accountApi = {

  // fn: đăng ký
  postSignUp: (registerRequest) => {
    const url = ACCOUNT_API_ENDPOINT + '/register';
    return axiosClient.post(url, registerRequest);
  },
};

export default accountApi;
