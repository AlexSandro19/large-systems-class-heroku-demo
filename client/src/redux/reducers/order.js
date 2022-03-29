import {GET_CURRENT_ORDER,GET_CURRENT_ORDER_SUCCESS,UPDATE_ORDER,DELETE_ORDER,
    CREATE_ORDER, GET_ALL_ORDERS_SUCCESS, SAVE_CART} from "../constants/order"
const initialState={
    currentOrder:{},
    orders:[],
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_CURRENT_ORDER:
            return{
            currentOrder:null,
            orders:[]
            }
        case GET_CURRENT_ORDER_SUCCESS:
            return{
                currentOrder:action.payload,
                orders:[]
            }
        case UPDATE_ORDER:
            return{
                currentOrder:action.payload,
                orders:[]
            }
        case DELETE_ORDER:
            return{
                currentOrder:{},
                orders:[]
            }
        case GET_ALL_ORDERS_SUCCESS:
            return{
                currentOrder:{},
                orders:action.payload,
            }   
        default: 
        return state;
    }

}

export default reducer
