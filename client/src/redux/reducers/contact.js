import { CONTACT_FORM_SENDING, CONTACT_FORM_SUCCESS } from "../constants/contact";

const initialState = {
    requesting: false,
    successful: false,
    message: "",
  };


  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CONTACT_FORM_SENDING:
        return {
          requesting: true,
          successful: false,
          message: "",
        };
      case CONTACT_FORM_SUCCESS:
        return {
          message: action.payload.message,
          requesting: false,
          successful: true,
        };
      default:
        return state;
    }
  };
  
  export default reducer;