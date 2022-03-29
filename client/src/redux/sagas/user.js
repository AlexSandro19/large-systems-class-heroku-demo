import { REGISTER_USER, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS,UPDATE_USER,UPDATE_USER_SUCCESS,UPDATE_USER_FAILURE } from "../constants/user"
import { takeLatest, call, put } from "redux-saga/effects";
import { registerApi,updateUserApi } from "../../services/auth.service";
import { setUser } from "../actions/user";
import { LOGIN_SUCCESS } from "../constants/auth";
function* updateUserFlow (action){
    try{
            const user = action.payload;
            const token =action.token;
            const exp = action.exp;
         
            const updatedUser = yield call(updateUserApi,user.name,user.email,user.username,user.firstName,user.lastName,user.password,user.passwordConfirm,user.phone,user.address)
      
            yield put(setUser(token, updatedUser._id, updatedUser.role, exp,updatedUser.username,updatedUser.firstName,updatedUser.lastName, updatedUser.email,updatedUser.phone,updatedUser.address,updatedUser.cart,updatedUser.emailConfirmed,updatedUser.orders));
            yield put({
              type: LOGIN_SUCCESS,
            });
            yield put({
                type:"SUCCESS",
                message:{
                    text:"You have successfully updated your user profile",
                    severity:"success"
                }
            })
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
function* register(action){
    try{
        console.log(action.payload);
        const {email,username,firstName,lastName,password,confirmPassword,phone,address}=action.payload.form;
        const message= yield call(registerApi,email,username,password,confirmPassword,firstName,lastName,phone,address);
        yield put({
            type:"SUCCESS",
            message:{
                text:message.message,
                severity:"success"
            }
        })
    }catch(e){
        console.log(e);
        yield put({
            type:"FAILURE",
            message:{
                text:e.message,
                severity:"error",
            },
            errors:e.errors
        })
    }

}

function* registrationWatcher(){

    yield takeLatest(REGISTER_USER,register);
    yield takeLatest(UPDATE_USER,updateUserFlow)
}

export default registrationWatcher