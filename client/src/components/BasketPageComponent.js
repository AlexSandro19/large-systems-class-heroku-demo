import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Card, CardActionArea, ListItemButton, Checkbox, Radio, CardContent,ListItem, ListItemIcon,ListItemText,Toolbar, List, Drawer, Grid, Box, Typography, ButtonBase, Badge, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup, Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems, setFilteredItems} from "../redux/actions/item"
import {addItemToBasket, updateItemsBasket} from "../redux/actions/basket";
import {Loader} from "./Loader"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
import {saveCartAction} from "../redux/actions/order";
import { useHistory } from "react-router-dom";

import Item from "../components/Item"; 

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

export const BasketPageComponent=({goBack,itemsInBasket, items, user, updateItemsBasket, saveCartAction, })=>{

    const [emailNotConfirmed, setEmailNotConfirmed] = useState(false)
    const history = useHistory()
    // const [noMoreItemsToAdd, setNoMoreItemsToAdd] = useState(false);
    let noMoreItemsToAdd = false;
    const countSameItems = (receivedItem) => {
      const sameItemArray = itemsInBasket.filter(item => receivedItem._id === item._id);
      return sameItemArray.length;
    } 

    
    const itemsToDisplay = []
    if (itemsInBasket.length){
      for (let i = 0; i < itemsInBasket.length; i++){
        console.log("Index in the beginning", i)
        const item = itemsInBasket[i]
        console.log("item in itemsToDisplay", item)
        const numberOfDuplicates = countSameItems(item) - 1
        console.log("numberOfDuplicates ", numberOfDuplicates)
        itemsToDisplay.push(item)
        i += numberOfDuplicates
        console.log("Index in the end", i)
      }
      console.log("items in itemsToDisplay", itemsToDisplay)

    }

    const capitalizeString = (initialStr) => {
      if (initialStr) {
        return initialStr
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
        return ""
    };

  

    const removeItem = (itemToRemove) => {
        const updatedItemsInBasket = itemsInBasket.filter(item => item._id !== itemToRemove._id);

        updateItemsBasket(updatedItemsInBasket); 
        saveCartAction(updatedItemsInBasket,user.token,user.exp,"REMOVE");
    }

    const changeQuantity = (itemToChangeQuantity, action) => {
        // e.preventDefault();
        const updatedItemsList = [...itemsInBasket];
     
        if (action === "increase"){
            const index = updatedItemsList.indexOf(itemToChangeQuantity);
            updatedItemsList.splice(index, 0, itemToChangeQuantity);
        }else if (action === "reduce"){
            const index = updatedItemsList.indexOf(itemToChangeQuantity);
            updatedItemsList.splice(index, 1);
        }
        updateItemsBasket(updatedItemsList);
        saveCartAction(updatedItemsList,user.token, user.exp);
    }

    const disableIncreaseButton = (itemToCheck) => {
        const countItemOccurences = countSameItems(itemToCheck);
        
        if (countItemOccurences >= itemToCheck.quantity){
            // setNoMoreItemsToAdd(true);
            noMoreItemsToAdd = true;
            return true;
        }else{
            return false;
        }
        

    }
    
    const disableReduceButton = (itemToCheck) => {
        const countItemOccurences = countSameItems(itemToCheck);
        if (countItemOccurences === 1){
            return true;
        }

    }

    const buttonPressed = () => {
      console.log("Button Pressed -- checkout")
      // const itemsInCart = itemsInBasket.map(item => item._id);
      // const itemsInCart = itemsToDisplay.map(currentItem => ({itemObject:currentItem, itemName:currentItem.name,itemPrice:currentItem.price, quantityInCart: countSameItems(currentItem), totalPerItem: countSameItems(currentItem) * currentItem.price}))
      // console.log("itemsInCart ", itemsInCart)
      if (user.emailConfirmed){
        history.push("/orderDetails")
      }else{
        setEmailNotConfirmed(true);
      }
    }

    return (
        (!itemsToDisplay.length || !itemsInBasket.length) ? <Loader></Loader> : ( //if posts.length is 0 then is false, !false => true
            <>
    <Grid container>
    <Grid item xs={12}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="items-table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Change Quantity</TableCell>
            <TableCell align="right">Delete Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsToDisplay.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {capitalizeString(item.name)}
              </TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{countSameItems(item)}</TableCell>
              <TableCell align="right">{item.price} DKK</TableCell>
              <TableCell align="right">{item.price * countSameItems(item)} DKK</TableCell>
              <TableCell align="right">
              <ButtonGroup>
          <Button
            aria-label="reduce"
            disabled={disableReduceButton(item)}
            onClick={() => {
                changeQuantity(item, "reduce");
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            disabled={disableIncreaseButton(item)}
            onClick={() => {
              changeQuantity(item, "increase");
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
              </TableCell>
              <TableCell align="right">
                <Button size="small" color="primary" onClick={() => removeItem(item)}>
                    <DeleteIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {/* <TableRow>
            <TableCell colspan="7">&nbsp;</TableCell>
          </TableRow>
          <TableRow> 
            <TableCell >&nbsp;</TableCell>
            <TableCell>Toal: </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={12}>
      <Button sx={{ marginTop: '15px' }} onClick={buttonPressed} variant="contained">Proceed to Checkout</Button>
    </Grid>
    <Grid item xs={12}>
      <Button sx={{ marginTop: '15px' }} onClick={goBack} variant="outlined">Back</Button>
    </Grid>
    </Grid>
    <Snackbar
      open={noMoreItemsToAdd}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={2000}
      onClose={() => {noMoreItemsToAdd = false}}
      // message={`${item.name} item was added to Basket!`}
      // action={action}
    >
      <Alert severity="info" sx={{ width: '100%' }}>
        <b>You reached the quantity limit for this item.</b>
      </Alert>
    </Snackbar>
    <Snackbar
      open={emailNotConfirmed}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={2000}
      // message={`${item.name} item was added to Basket!`}
      // action={action}
    >
      <Alert severity="info" sx={{ width: '100%' }}>
        <b>You need to confirm your email before proceeeding.</b>
      </Alert>
    </Snackbar>
    </>
    ))
}


const mapStateToProps = (state) => {
    return {
        // itemsInBasket: state.basket.itemsInBasket, 
        // userIsAuthenticated: state.user.isAuthenticated,
    };
};

export default connect(mapStateToProps, {updateItemsBasket,saveCartAction})(BasketPageComponent);


