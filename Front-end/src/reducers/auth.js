// Note: reducer xử lý việc xác thực người dùng

import loginApi from 'apis/loginApi';


// ! constants
const SET_IS_AUTH = 'SET_IS_AUTH';

// ! action requests (call API)

//======= actions request (call API) =======//


// xác thực mã access token
const getIsAuth = () => {
  return async (dispatch) => {
    try {
      const result = await loginApi.getAuth();
      dispatch(setIsAuth(result.data.id !=null && result.data.id > 0));
    } catch (error) {
      if (error.response) {
        console.log("auth false")
      } else {
        dispatch(setIsAuth(false));
      }
    }
  };
};

// ! normal action

// fn: set authentication cho người dùng
const setIsAuth = (isAuth) => {
  return { type: SET_IS_AUTH, payload: { isAuth } };
};

// ! reducers
const initialState = { isAuth: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      const { isAuth } = action.payload;
      return { ...state, isAuth };
    default:
      return { ...state };
  }
};

// ! exports
export default {
  authReducer,
  SET_IS_AUTH,
  setIsAuth,
  getIsAuth,
};
