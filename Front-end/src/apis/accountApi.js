import axiosClient from './axiosClient';

const ACCOUNT_API_ENDPOINT = '/user';

const accountApi = {

  // fn: đăng ký
  postSignUp: (registerRequest) => {
    const url = ACCOUNT_API_ENDPOINT + '/register';
    return axiosClient.post(url, registerRequest);
  },

  // fn: gửi mã xác nhận lấy lại mật khẩu
  postSendCodeForgotPW: (email) => {
    const url = ACCOUNT_API_ENDPOINT + '/verify/forgot';
    return axiosClient.post(url, email);
  },

  // fn: reset password
  postResetPassword: (account) => {
    const url = ACCOUNT_API_ENDPOINT + '/reset-pw';
    return axiosClient.post(url, account);
  },
};

export default accountApi;
