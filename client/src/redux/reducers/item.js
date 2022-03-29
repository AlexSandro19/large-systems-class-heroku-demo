import { REQUEST_ALL_ITEMS,DELETE_ITEM, REQUEST_ALL_ITEMS_SUCCESS, SET_CURRENT_ITEM, SET_FILTERED_ITEMS, CREATE_ITEM, UPDATE_ITEM } from "../constants/item";


const initialState = {items: [], currentItem:{}, filteredItems:[] };


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ALL_ITEMS_SUCCESS:
      return {
          items: action.payload,
          currentItem: {},
      };
    case REQUEST_ALL_ITEMS:
      return {
        items: [],
        currentItem: {},
      };
    case SET_CURRENT_ITEM:
      return {
        items: action.items,
        currentItem: action.payload,
      };
    
    case SET_FILTERED_ITEMS:
      return {
        filteredItems: action.payload,
      };
    case CREATE_ITEM:
      return{
        items:action.payload.items,
        currentItem:action.payload.newItem
      }
    case DELETE_ITEM:
      return{
        items:[],
        currentItem:{}
      }
    default:
      return state;
  }
};
export default reducer;
