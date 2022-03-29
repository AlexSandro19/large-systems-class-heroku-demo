import { USER_SET, USER_UNSET,REGISTER_USER,HIDE_MESSAGE,UPDATE_USER,UPDATE_USER_FAILURE,UPDATE_USER_SUCCESS } from "../constants/user";
export const updateUser = (user,token,exp)=>{
  return {
    type:UPDATE_USER,
    payload:user,
    token,
    exp
  }
}
export const setUser = (token, userId, role, exp,username,firstName,lastName,email,phone,address,cart,emailConfirmed,orders) => {
  return {
    type: USER_SET,
    payload: { token, userId, role, exp,username,firstName,lastName,email,phone,address,cart,emailConfirmed,orders },
  };
};

export const unsetUser = (error) => {
  return {
    type: USER_UNSET,
    error:error
  };
};

export const registerUser=(form)=>{

  return{
    type:REGISTER_USER,
    payload:{form}
  }
}

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
