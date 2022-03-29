import axios from "axios";

const storageName = "allItems";
const requestItemsUrl = "/api/items";
const updateItemUrl = "/api/updateItem";
const createItemUrl ="/api/createItem";
const deleteItemUrl="/api/deleteItem";


export const requestItems = () => {

    return axios.get(requestItemsUrl)
                .then((response) => response.data)
                .catch((error) => {
                    throw error.response.data;
                });
} 
export const updateItem = (item,token) => {

    return axios.post(updateItemUrl, item,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    throw error.response.data;
                });
} 
export const createItem = (currentItem,token) => {

    return axios.post(createItemUrl, currentItem,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    throw error.response.data;
                });
} 
export const deleteItemService = (deleteItem,token) => {

    return axios.post(deleteItemUrl, deleteItem,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    throw error.response.data;
                });
} 