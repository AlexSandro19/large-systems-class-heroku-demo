import { REQUEST_ALL_ITEMS,DELETE_ITEM, REQUEST_ALL_ITEMS_SUCCESS, SET_CURRENT_ITEM, SET_FILTERED_ITEMS, CREATE_ITEM, UPDATE_ITEM } from "../constants/item";

export const requestAllItemsSuccess = (data) => {
    return {
        type: REQUEST_ALL_ITEMS_SUCCESS,
        message: {
        text: "Successfully seceived all items",
        },
        payload: data,
    };
};

export const requestAllItems = () => {

    return {
        type: REQUEST_ALL_ITEMS,
        message: "Requesting all items",
    };
};

export const setCurrentItem = (items,item) => {

    return {
        type: SET_CURRENT_ITEM,
        payload: item,
        items: items,
    }
} 
export const setFilteredItems = (filteredItems) => {

    return {
        type: SET_FILTERED_ITEMS,
        payload: filteredItems
    }
} 

export const createItem = (items,newItem,token) => {

    return {
        type: CREATE_ITEM,
        payload: {items:items,newItem:newItem,token:token},
        
    }
} 
export const deleteItem = (deleteItem,token) => {

    return {
        type: DELETE_ITEM,
        payload: {deleteItem:deleteItem,token:token}
    }
} 
export const updateItem = (user,updatedItem,token) => {

    return {
        type: UPDATE_ITEM,
        payload: {updatedItem:updatedItem,token:token},
        user
    }
} 


