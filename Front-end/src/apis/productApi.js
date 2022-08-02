import axiosClient from './axiosClient';

const PRODUCT_API_URL = '/product';
const CATEGORY_API_URL = '/category';

const productApi = {

  // api: lấy all category
  getCategory: () => {
    const url = CATEGORY_API_URL + '/all'
    return axiosClient.get(url);
  },

  // api: Lấy 1 sản phẩm
  getProduct: (id) => {
    const url = PRODUCT_API_URL+"/"+id;
    return axiosClient.get(url);
  },


  // api: Lấy danh sách sản phẩm và phân trang
  getAllProducts: (page = 0, size = 8) => {
    const url = PRODUCT_API_URL + '/all';
    return axiosClient.get(url, { params: { page, size } });
  },

  // api: tìm kiếm sản phẩm
  getSearchProducts: (product , page = 0, size = 8, category) => {
    const url = PRODUCT_API_URL + '/filter';
    let params;
    if (product){
      params= {
        productName: product, page: page , size
      }
    }else {
    params = { page: page , size, categoryName: category }}
    return axiosClient.get(url, { params: params });
  },

};

export default productApi;
