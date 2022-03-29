import { takeLatest,take, call, put } from "redux-saga/effects";
import { getEmailConfirmation } from "../../services/auth.service";
import { EMAIL_CONFIRMATION,EMAIL_CONFIRMATION_SUCCESS,EMAIL_CONFIRMATION_FAILURE } from "../constants/auth";
function* emailConfirmFlow(action){
    try{
        const  payload  =action.payload;
    
        const response =yield call(getEmailConfirmation,payload);

        if(response.emailConfirmed){
            yield put({type:EMAIL_CONFIRMATION_SUCCESS});
            yield put({
                type:"SUCCESS",
                message:{
                    text:"You have successfully confirmed your email",
                    severity:"success"
                }
            })
        }else if (!response.emailConfirmed){
            yield put({type:EMAIL_CONFIRMATION_FAILURE});
        }
    }catch(error){
        console.log(error);
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
function* emailConfirmationWatcher(){
    yield takeLatest(EMAIL_CONFIRMATION,emailConfirmFlow);
 

}

export default emailConfirmationWatcher

