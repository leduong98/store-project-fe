import axiosClient from './axiosClient';
import constants from 'constants/index';

const COMMENT_API_URL = '/rating';

const commentApi = {
  // api: Lấy danh sách comment của 1 sản phẩm
  getCommentList: (id) => {
    const url = COMMENT_API_URL;
    return axiosClient.get(url, { params: { productId: id } });
  },

  // api: Thêm 1 comment
  postComment: (cmt) => {
    const token = localStorage.getItem(constants.ACCESS_TOKEN_KEY)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const url = COMMENT_API_URL;
    return axiosClient.post(url, cmt, config);
  },
};

export default commentApi;
