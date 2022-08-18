import axiosClient from './axiosClient';
import constants
  from "../constants";

const ORDER_API_ENDPOINT = '/order';

const orderApi = {
  // api: lấy danh sách đơn hàng
  getOrderList: () => {
    const token = localStorage.getItem(constants.ACCESS_TOKEN_KEY)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const url = ORDER_API_ENDPOINT + '/user';
    return axiosClient.get(url, config);
  }
};

export default orderApi;
