//======= imports =======//
import adminApi from "../apis/adminApi";
//======= constant action type =======//
const GET_CATEGORY = 'GET_CATEGORY';

//======= actions request (call API) =======//
const getListCategory = () => {
  return async (dispatch) => {
    try {
      const response = await adminApi.getCategoryList();
      if (response.status == 200){
        console.log("Lấy data thành công!")
      }
      const categoryList  = response.data.data;
      dispatch(getCategory(categoryList));
    } catch (error) {
      throw error;
    }
  };
};

//======= actions =======//
const getCategory = (data) => {
  return {
    type: GET_CATEGORY,
    payload: data,
  };
};

//======= initial state =======//
const initialState = {};

//======= reducer =======//
const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY: {
      return { ...state, categoryList: action.payload };
    }

    default:
      return { ...state };
  }
};

//======= exports =======//
export default {
  commonReducer,
  getListCategory
};
