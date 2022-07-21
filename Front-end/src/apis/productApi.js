import axiosClient from './axiosClient';

const PRODUCT_API_URL = '/product';
const CATEGORY_API_URL = '/category';

const productApi = {

  // api: lấy all category
  getCategory: () => {
    const url = CATEGORY_API_URL + '/all'
    return axiosClient.get(url);
  },

  // api: lấy product list theo category
  getProductByCat: (catId) => {
    const param = {
      catId: catId
    }
    const url= PRODUCT_API_URL + '/all'
    return axiosClient.get(url, { params: { catId } })
  },

  // api: Lấy 1 sản phẩm
  getProduct: (id) => {
    const url = PRODUCT_API_URL+"/"+id;
    return axiosClient.get(url);
  },

  // api: Lấy danh sách sp, type = -1 : all, trừ sản phẩm có id
  getProductList: (type = -1, brand = '', limit = 1, id) => {
    const url = PRODUCT_API_URL + '/list/related';
    return axiosClient.get(url, { params: { type, brand, limit, id } });
  },

  // api: Lấy danh sách sản phẩm và phân trang
  getAllProducts: (page = 0, size = 8) => {
    const url = PRODUCT_API_URL + '/all';
    return axiosClient.get(url, { params: { page, size } });
  },

  // api: tìm kiếm sản phẩm
  getSearchProducts: (value = '', page = 1, perPage = 8) => {
    const url = PRODUCT_API_URL + '/search';
    return axiosClient.get(url, { params: { value, page, perPage } });
  },

  // api: lọc sản phẩm
  getFilterProducts: (
    type = 0,
    pOption = {},
    dOption = {},
    page = 0,
    perPage = 8,
  ) => {
    const url = PRODUCT_API_URL + '/filter';
    RegExp.prototype.toJSON = RegExp.prototype.toString;
    const params = {
      type,
      pOption: JSON.stringify(pOption),
      dOption: JSON.stringify(dOption),
      page,
      perPage,
    };
    return axiosClient.get(url, {
      params,
    });
  },
};

export default productApi;
