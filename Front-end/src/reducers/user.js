//======= imports =======//
import loginApi
  from "../apis/loginApi";
//======= constant action type =======//
const GET_USER = 'GET_USER';

//======= actions request (call API) =======//
const getUserRequest = () => {
  return async (dispatch) => {
    try {
      const response = await loginApi.getAuth();
      if (response.status == 200){
        console.log("Lấy data thành công!")
      }
      const user  = response.data;
      dispatch(getUser(user));
    } catch (error) {
      console.log("false")
    }
  };
};

//======= actions =======//
const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

//======= initial state =======//
const initialState = {};

//======= reducer =======//
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...action.payload };
    }

    default:
      return { ...state };
  }
};

//======= exports =======//
export default {
  userReducer,
  getUserRequest,
  getUser,
  GET_USER,
};
