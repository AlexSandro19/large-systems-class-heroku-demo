import { ADD_ITEM_TO_BASKET, UPDATED_ITEMS_IN_BASKET } from "../constants/basket";


export const addItemToBasket = (items) => {
    return {
        type: ADD_ITEM_TO_BASKET,
        payload: items
    }
}

export const updateItemsBasket = (items) => {
    return {
        type: UPDATED_ITEMS_IN_BASKET,
        payload: items
    }
}

