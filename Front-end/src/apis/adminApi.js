import axiosClient from './axiosClient';

const MAX_JAVA_INTEGER = 2147483647

const adminApi = {

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

};

export default adminApi;
