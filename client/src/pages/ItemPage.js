import React, { useEffect, useCallback, useState } from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, Button, ButtonBase, Paper, Divider, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {requestAllItems, getCurrentItem} from "../redux/actions/item"
import {addItemToBasket, updateItemsBasket} from "../redux/actions/basket";
import ShoppingPageComponent from "../components/ShoppingPageComponent"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import {useLocation} from "react-router-dom"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {saveCartAction} from "../redux/actions/order";

const useStyles=makeStyles(()=>({
    back:{
        margin:"2%",
        backgroundColor:"#D7CD79",
        flexGrow:2,
        width: '600px',
        height: '100%',
        paddingBottom:"7%",
    },
    card:{
       
        marginTop:"10%",
        marginLeft:"5%",
        width:"90%",
    },

}))

const ItemPage=({items, currentItem, user,itemsInBasket,saveCartAction,addItemToBasket,updateItemsBasket})=> {
    console.log("ItemInBasket in ItemOage", itemsInBasket)
    const history = useHistory();
    const classes=useStyles();

    const [isItemInBasket, setIsItemInBasket] = useState(false);
    
    const checkIfItemInBasket = () => {
        let isItemInArray = [];
        if (itemsInBasket){
            isItemInArray = itemsInBasket.filter(itemInBasket => itemInBasket._id === currentItem._id);
        }
        if (isItemInArray.length !== 0){
            return true;
        }else{
           return false;
        } 
    }
   
    useEffect( () => {
        const returnedValue = checkIfItemInBasket()
        console.log("returnedValue", returnedValue)
        
        setIsItemInBasket(returnedValue);
    }, [currentItem])
    
    const addToCartPressed = (e) => {
        e.preventDefault();
        const index = itemsInBasket.indexOf(currentItem);
        if (index === -1){
            itemsInBasket.push(currentItem);
        }else{
            itemsInBasket.splice(index, 0, currentItem);
        }
        addItemToBasket(itemsInBasket);
        setIsItemInBasket(true);
        saveCartAction(itemsInBasket,user.token, user.exp, "ADD");
    }

    const removeItem = () => {
        const updatedItemsInBasket = itemsInBasket.filter(itemFromBasket => currentItem._id !== itemFromBasket._id);
        console.log("updatedItemsInBasket", updatedItemsInBasket)
        updateItemsBasket(updatedItemsInBasket); 
        console.log("Delete: ", currentItem);
        setIsItemInBasket(false);
        saveCartAction(updatedItemsInBasket, user.token, user.exp, "REMOVE");
    }
    const goBack = ()=>{
        history.goBack();
    }
    
    return (
        <div style={{height:"80vh"}}>
        <Paper width="90%" sx={{ margin: '15px', padding: "20px" }}>
            <img src={currentItem.picturesArray[0]} alt="" style={{width:"400px"}}></img>
            <Typography variant="h1">{currentItem.name}</Typography>
            <Typography variant="subtitle1">{currentItem.description}</Typography>
            <Typography variant="body2">Suitable for: {currentItem.categoryArray.join(', ')}</Typography>
            <Typography variant="body2">Made of: {currentItem.materialArray.join(', ')}</Typography>
            <Typography variant="body2">Warranty: {currentItem.hasWarranty ? "Yes" : "No"}</Typography>
            <Typography variant="body2">Rating: {currentItem.ratings.medianValueRating}</Typography>
            <Typography variant="h5">Price: {currentItem.price} DKK</Typography>
            {user.isAuthenticated  && !isItemInBasket? 
                
                <Button onClick={addToCartPressed}><Typography style={{textAlign:"center"}} variant="h6">ADD <AddShoppingCartIcon  fontSize="default"/></Typography></Button>
                : <></>
            } 
                        {user.isAuthenticated  && isItemInBasket ? 
                <>
                <Button disabled><Typography style={{textAlign:"center"}} variant="h6">ADDED <DoneOutlineIcon  fontSize="default"/></Typography></Button>
                <Tooltip title="Remove Item from Basket" arrow>
                    <Button onClick={() => removeItem() }><RemoveShoppingCartIcon/></Button>
                </Tooltip>
                </>
                : <></>
            }
            </Paper>
         <Button sx={{ marginLeft: '15px'}} variant="outlined" onClick={goBack}>Back</Button>
         </div>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items,
        currentItem: state.items.currentItem,
        user: state.user,
        itemsInBasket: state.basket.itemsInBasket
    };
};
    
export default connect(mapStateToProps,{saveCartAction,addItemToBasket,updateItemsBasket})(ItemPage)