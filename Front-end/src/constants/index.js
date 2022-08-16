
const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/login/forgot-pw',
  PRODUCT: '/product/:productId',
  NOT_FOUND: '/not-found',
  ADMIN: '/admin',
  CART: '/cart',
  SEARCH: '/search',
  FILTER: '/filter',
  ACCOUNT: '/account',
  PAYMENT: '/payment',
  PAYMENTSC: '/payment/success'
};

export default {
  REFRESH_TOKEN_KEY: 'refresh_token',
  ACCESS_TOKEN_KEY: 'token-camera',
  MAX_VERIFY_CODE: 6,
  // tuổi nhỏ nhất sử dụng app
  MIN_AGE: 8,
  // thời gian delay khi chuyển trang
  DELAY_TIME: 750,
  // số lần đăng nhập sai tối đa
  MAX_FAILED_LOGIN_TIMES: 5,
  ROUTES,
  REFRESH_TOKEN: 'refresh_token',
  // tỉ lệ nén ảnh, và nén png 2MB
  COMPRESSION_RADIO: 0.6,
  COMPRESSION_RADIO_PNG: 2000000,
  // số lượng sản phẩm liên quan tối đa cần lấy
  MAX_RELATED_PRODUCTS: 12,
  // Avatar mặc định của user
  DEFAULT_USER_AVT:
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/c_scale,q_60,w_80/v1607750466/defaults/default-avatar_amkff5.jpg',
  // Số comment sản phẩm trên trang
  COMMENT_PER_PAGE: 5,
  // độ dài tối đa của cmt
  MAX_LEN_COMMENT: 1000,
  // key danh sách giỏ hàng
  CARTS: 'carts',
};
