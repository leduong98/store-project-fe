import { combineReducers } from 'redux';
import authReducer from './auth';
import cartsReducer from './carts';
import userReducer from './user';
import commonReducer from './common';

const rootReducer = combineReducers({
  authenticate: authReducer.authReducer,
  user: userReducer.userReducer,
  carts: cartsReducer.cartReducer,
  common: commonReducer.commonReducer
});

export default rootReducer;
