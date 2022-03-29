import {
    GET_CURRENT_ORDER,
    DELETE_ORDER, 
    GET_CURRENT_ORDER_SUCCESS,
    UPDATE_ORDER,
    SAVE_CART,
    CREATE_ORDER,
    SAVE_ORDER,
    GET_ALL_ORDERS,
    GET_ALL_ORDERS_SUCCESS,} from "../constants/order"
export const setCurrentOrder = (order) => {

    return {
        type: GET_CURRENT_ORDER_SUCCESS,
        payload: order
    }
} 
export const getAllOrders = (token) => {
    return {
        type: GET_ALL_ORDERS,
        payload: token
    }
} 
export const getAllOrdersSUCCESS = (orders) => {
    return {
        type: GET_ALL_ORDERS_SUCCESS,
        payload: orders
    }
}
export const getCurrentOrder = (orderId,token) => {
    return {
        type: GET_CURRENT_ORDER,
        payload: orderId,
        token
    }
} 
export const updateOrder = (order,token) =>{
    return{
        type:UPDATE_ORDER,
        payload:{order:order},
        token:token
    }
}
export const deleteOrder = (order,token) =>{
    return{
        type:DELETE_ORDER,
        payload:{order:order,token:token},
    }
}

export const createOrderAction = (order,token, ) => {

    return {
        type: CREATE_ORDER,
        payload: {order:order,token:token}, 

    }
}


// export const saveOrderAction = (order) => {
//     console.log("In the actions - saveOrder", order);
//     return {
//         type: SAVE_ORDER,
//         payload: order
//     }
// }

export const saveCartAction = ( cart,token,exp,activityType) => {
   
    return {
        type: SAVE_CART,
        payload: {cart:cart,token:token,exp:exp},
        activityType:activityType
    }
}