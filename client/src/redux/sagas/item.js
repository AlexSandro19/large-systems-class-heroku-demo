import { takeLatest, call, put } from "redux-saga/effects";
import { REQUEST_ALL_ITEMS, REQUEST_ALL_ITEMS_SUCCESS, UPDATE_ITEM,CREATE_ITEM, DELETE_ITEM } from "../constants/item";
import {LOGIN_SUCCESS} from "../constants/auth";
import {refreshUser} from "../../services/auth.service";
import { requestAllItemsSuccess, setCurrentItem } from "../actions/item";
import {setUser,unsetUser} from "../actions/user";
import { requestItems, updateItem,createItem,deleteItemService } from  "../../services/item.service";

function* updateItemFlow(action) {
    try {
      const item = action.payload.updatedItem;
      const user= action.user;
      const token = action.payload.token;
      const updatedItem = yield call(updateItem, item,token)
      //const payload=yield call(refreshUser,user);
      //console.log(payload);
      // yield put(setUser(payload.token, payload.userId, payload.role, payload.exp,payload.username,payload.firstName, payload.lastName,payload.email,payload.phone,payload.address,payload.cart,payload.emailConfirmed,payload.orders));
      // yield put({
      //   type: LOGIN_SUCCESS,
      // });
      yield put({type:REQUEST_ALL_ITEMS})
      yield put({
        type:"SUCCESS",
        message:{
            text:"You have successfully updated the item",
            severity:"success"
        }
    })
    }catch (error) {
      if(error.status === 401){
        yield put(unsetUser(true));
      }else{
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
}
function* deleteItemFlow (action){
  try{
    const {deleteItem,token} = action.payload;
    const response = yield call(deleteItemService,deleteItem,token);
    console.log(response);
    yield put({type:REQUEST_ALL_ITEMS})
    yield put({
      type:"SUCCESS",
      message:{
          text:"You have successfully deleted your item",
          severity:"success"
      }
  })
    }catch(error){
      if(error.status === 401){
        yield put(unsetUser(true));
         
       
      }else{
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
}
function* createItemFlow (action){
  try{
    const {newItem,token} = action.payload;
   
    const response = yield call (createItem,newItem,token);

    yield put({type:REQUEST_ALL_ITEMS})
    yield put({
      type:"SUCCESS",
      message:{
          text:"You have successfully created the Item",
          severity:"success"
      }
  })
  }catch(error){
    if(error.status === 401){
      yield put(unsetUser(true));
       
     
    }else{
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
}
function* shoppingPageFlow(action) {
    
    try {

      const responseMessage = yield call(requestItems);
      yield put(requestAllItemsSuccess(responseMessage));
  
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

function* shoppingPageWatcher() {
    yield takeLatest(REQUEST_ALL_ITEMS, shoppingPageFlow );
    yield takeLatest(UPDATE_ITEM, updateItemFlow);
    yield takeLatest(CREATE_ITEM,createItemFlow);
    yield takeLatest(DELETE_ITEM,deleteItemFlow);    
}



export default shoppingPageWatcher
