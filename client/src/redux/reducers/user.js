import { USER_SET, USER_UNSET, } from "../constants/user";

const initialState = {
  isAuthenticated: false,
  id: null,
  token: null,
  email:null,
  firstName:null,
  lastame:null,
  username:null,
  address:null,
  phone:null,
  emailConfirmed:null,
  cart:null,
  orders:null,
  role: null,
  exp: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      return {
        isAuthenticated: true,
        id: action.payload.userId,
        token: action.payload.token,
        email:action.payload.email,
        firstName:action.payload.firstName,
        lastName:action.payload.lastName,
        username:action.payload.username,
        address:action.payload.address,
        phone:action.payload.phone,
        emailConfirmed:action.payload.emailConfirmed,
        cart:action.payload.cart,
        orders:action.payload.orders,
        role: action.payload.role,
        exp: action.payload.exp,
      };
    case USER_UNSET:
      return {
        isAuthenticated: false,
        id: null,
        token: null,
        email:null,
        name:null,
        username:null,
        address:null,
        phone:null,
        emailConfirmed:null,
        cart:null,
        orders:null,
        role: null,
        exp: null,
      };
    default:
      return state;
  }
};
export default reducer;
