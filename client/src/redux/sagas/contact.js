import { takeLatest, call, put } from "redux-saga/effects";
import { CONTACT_FORM_SENDING } from "../constants/contact";

import { contactFormSuccess } from "../actions/contact";

import { contactEmail } from  "../../services/contact.service";

function* loginFlow(action) {
    
    try {

      const {firstName, lastName, email, subject, message } = action.payload
      const responseMessage = yield call(contactEmail, firstName, lastName, email, subject, message);
  
      yield put(contactFormSuccess(responseMessage));
      yield put({
        type:"SUCCESS",
        message:{
            text:"You have successfully sent a contact email!",
            severity:"success"
        }
    })
    } catch (error) {
      yield put({
        type:"FAILURE",
        message:{
            text:error.message,
            severity:"error",
        },
        errors:error.errors
    })
    }
}

function* contactFormWatcher() {
    yield takeLatest(CONTACT_FORM_SENDING, loginFlow )
}

export default contactFormWatcher
