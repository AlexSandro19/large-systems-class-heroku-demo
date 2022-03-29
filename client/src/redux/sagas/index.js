import { all } from "redux-saga/effects";
import ContactSaga from "./contact";
import ItemSaga from "./item";
import LoginSaga from "./auth";
import UserSaga from "./user";
import OrderSaga from "./order";
import EmailSaga from "./email";
export default function* rootSaga() {
  yield all([LoginSaga(),ItemSaga(),UserSaga(),ContactSaga(),OrderSaga(),EmailSaga()]);
}
