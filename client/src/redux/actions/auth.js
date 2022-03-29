import { LOGIN_REQUESTING,EMAIL_CONFIRMATION } from "../constants/auth";

export const loginRequest = ({ email, password }) => {
  return {
    type: LOGIN_REQUESTING,
    payload: { email, password },
  };
};

export const emailConfirmationRequest = ({hash}) =>{
  return{
    type:EMAIL_CONFIRMATION,
    payload:hash
  }
}