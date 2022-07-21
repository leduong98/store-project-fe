import axiosClient from './axiosClient';

const ADMIN_API_ENDPOINT = '/user';

const MAX_JAVA_INTEGER = 2147483647

const adminApi = {
  // fn: thêm sản phẩm
  postAddProduct: (product) => {
    const url = ADMIN_API_ENDPOINT + '/products/add';
    return axiosClient.post(url, product);
  },

  // fn: lấy danh sách sản phẩm theo loại và trang
  getProductListByType: (type = 0, page = 1, perPage = 1) => {
    const url = ADMIN_API_ENDPOINT + '/products';
    return axiosClient.get(url, {
      params: { type, page, perPage },
    });
  },

  // fn: Xoá 1 sản phẩm (admin page)
  removeProduct: (id) => {
    const url = ADMIN_API_ENDPOINT + '/products/remove';
    return axiosClient.delete(url, { params: { id } });
  },

  // fn: Cập nhật 1 sản phẩm
  updateProduct: (product) => {
    const url = ADMIN_API_ENDPOINT + '/products/update';
    return axiosClient.put(url, product);
  },

  // fn: đăng nhập với quyền admin
  postLogin: (account) => {
    const url = ADMIN_API_ENDPOINT + '/login';
    return axiosClient.post(url, account);
  },

  // fn: lấy danh sách admin user
  getUserAdminList: () => {
    const url = ADMIN_API_ENDPOINT + '/users';
    return axiosClient.get(url);
  },

  // fn: lấy danh sách khách hàng
  getCustomerList: (page = 1) => {
    const url = ADMIN_API_ENDPOINT + '/customer';
    return axiosClient.get(url, { params: page });
  },

  // fn: xoá 1 khách hàng
  delCustomer: (userId) => {
    const url = ADMIN_API_ENDPOINT + '/customer/del';
    return axiosClient.delete(url, { params: { userId } });
  },

  // fn: Lấy danh sách đơn hàng
  getOrderList: () => {
    const url = ADMIN_API_ENDPOINT + '/order';
    return axiosClient.get(url);
  },

  // fn: cập nhật trạng thái đơn hàng
  postUpdateOrderStatus: (id, orderStatus) => {
    const url = ADMIN_API_ENDPOINT + '/order';
    return axiosClient.post(url, { id, orderStatus });
  },

  getCategoryList: (page = 0, size = MAX_JAVA_INTEGER) => {
    const url = '/category/all';
    return axiosClient.get(url, {
      params: {
        page: page,
        size: size
      }
    });
  },

  insertCategory: (data) => {
    const url = '/category';
    return axiosClient.post(url, data);
  },

  updateCategory: (data) => {
    const url = '/category/' + data.id;
    return axiosClient.patch(url, data);
  },

  deleteCategory: (id) => {
    const url = '/category/' + id;
    return axiosClient.delete(url);
  },

  getAllProduct: () => {
    const url = '/product/all';
    return axiosClient.get(url);
  },

  insertProduct: (data) => {
    const url = '/product';
    return axiosClient.post(url, data);
  },

  updateProduct: (data) => {
    const url = '/product/' + data.id;
    return axiosClient.patch(url, data);
  },

  deleteProduct: (id) => {
    const url = '/product/' + id;
    return axiosClient.delete(url);
  },

  uploadFile: (file) => {
    const url = '/file';
    const formData = new FormData();

    formData.append("file", file);
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
  },

  getAllDiscount: (productId, page = 0, size = MAX_JAVA_INTEGER) => {
    const url = '/discount/filter';
    return axiosClient.get(url, {
      params: {
        page: page,
        size: size,
        productId: productId
      }
    });
  },

  insertDiscount: (data) => {
    const url = '/discount';
    return axiosClient.post(url, data);
  },

  updateDiscount: (data) => {
    const url = '/discount/' + data.id;
    return axiosClient.patch(url, data);
  },

  deleteDiscount: (id) => {
    const url = '/discount/' + id;
    return axiosClient.delete(url);
  },

  getAllTransaction: (page = 0, size = MAX_JAVA_INTEGER) => {
    const url = '/order/all';
    return axiosClient.get(url, {
      params: {
        page: page,
        size: size
      }
    });
  },

  updateStatusTransaction: (id, data) => {
    const url = `/order/${id}/status`;
    return axiosClient.post(url, data);
  },

  getTransactionById: (id) => {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  getSlideList: (page = 0, size = MAX_JAVA_INTEGER) => {
    const url = '/slider/all';
    return axiosClient.get(url, {
      params: {
        page: page,
        size: size
      }
    });
  },

  changeStatusSlide: (data) => {
    const url = '/slider/' + data + '/status/';
    return axiosClient.post(url, data);
  },

  insertSlide: (data) => {
    const url = '/slider';
    return axiosClient.post(url, data);
  },

  updateSlide: (data) => {
    const url = '/slider/' + data.id;
    return axiosClient.patch(url, data);
  },

  deleteSlide: (id) => {
    const url = '/slider/' + id;
    return axiosClient.delete(url);
  },

  getUserList: (page = 0, size = MAX_JAVA_INTEGER) => {
    const url = '/user/all';
    return axiosClient.get(url, {
      params: {
        page: page,
        size: size
      }
    });
  },

  changeStatusUser: (data) => {
    const url = '';
    return axiosClient.post(url, data);
  },

};

export default adminApi;
