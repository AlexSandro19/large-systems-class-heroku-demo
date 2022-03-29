import React, { Fragment, useEffect, useCallback, useState } from "react";
import FileBase from 'react-file-base64';
import { Card, CardActionArea, CardActions, CardContent, Grid, Box, Typography, ButtonBase, Button, Snackbar, Alert, Tooltip, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems, setCurrentItem} from "../redux/actions/item";
import {addItemToBasket, updateItemsBasket} from "../redux/actions/basket";
import {Link} from "react-router-dom"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
        borderRadius: '15',
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

})) 

const Item =({items,item,itemsInBasket, userIsAuthenticated, setCurrentItem,addItemToBasket, updateItemsBasket, user,saveCartAction})=>{

    const [isItemInBasket, setIsItemInBasket] = useState(false);
    
    const checkIfItemInBasket = () => {
        
        const isItemInArray = itemsInBasket.filter(itemInBasket => itemInBasket._id === item._id);
        if (isItemInArray.length !== 0){
            return true;
        }else{
           return false;
        } 
    }
   
    useEffect( () => {
        const returnedValue = checkIfItemInBasket()
   

        setIsItemInBasket(returnedValue);
    }, [itemsInBasket])

    const classes = useStyles();

    const [itemRemovedSnackbar, setItemRemovedSnackbar] = useState(false);
    const [itemAddedSnackbar, setItemAddedSnackbar] = useState(false);
    

    const addToCartPressed = (e) => {
        e.preventDefault();
        const index = itemsInBasket.indexOf(item);
        if (index === -1){
            itemsInBasket.push(item);
        }else{
            itemsInBasket.splice(index, 0, item);
        }
        addItemToBasket(itemsInBasket);
        setItemAddedSnackbar(true);
        setIsItemInBasket(true);
        saveCartAction(itemsInBasket,user.token,user.exp,"ADD");
    }

    const capitalizeString = (initialStr) => {
        return initialStr
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };

 

    const removeItem = () => {
        const updatedItemsInBasket = itemsInBasket.filter(itemFromBasket => item._id !== itemFromBasket._id);
        console.log("updatedItemsInBasket", updatedItemsInBasket)
        updateItemsBasket(updatedItemsInBasket); 
        console.log("Delete: ", item);
        setItemRemovedSnackbar(true);
        setIsItemInBasket(false);
        saveCartAction(updatedItemsInBasket,user.token,user.exp,"REMOVE");
    }

    return(
        <>
            <Card style={{backgroundColor:"#C4C4C4"}} className={classes.card}>
            <img src={item.picturesArray[0]} alt="" style={{width:"200px"}}></img> 
            <CardActionArea style={{backgroundColor:"#FDFFEE"}} component={Link} to="/item" onClick={() => {setCurrentItem(items,item,user.token)}}>
                <CardContent>
                    <div>
                    <Typography variant="h5">{item.name}</Typography>
                </div>
                    <Typography variant="body1">{item.description}</Typography>
                    <Typography variant="body1" style = {{display: 'flex',flexDirection:'column',alignItems:'flex-end'}}>{item.price} DKK</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            {userIsAuthenticated && !isItemInBasket? 
                
                <Button onClick={addToCartPressed}><Typography style={{textAlign:"center"}} variant="h6">ADD <AddShoppingCartIcon  fontSize="default"/></Typography></Button>
                : <></>
            }
            {userIsAuthenticated && isItemInBasket ? 
                <>
                <Button disabled><Typography style={{textAlign:"center"}} variant="h6">ADDED <DoneOutlineIcon  fontSize="default"/></Typography></Button>
                <Tooltip title="Remove Item from Basket" arrow>
                    <Button onClick={() => removeItem() }><RemoveShoppingCartIcon/></Button>
                </Tooltip>
                </>
                : <></>
            }
            {/* {
                isItemInBasket ? 
                <>
                <Button onClick={addToCartPressed}><Typography style={{textAlign:"center"}} variant="h6">ADD <AddShoppingCartIcon  fontSize="default"/></Typography></Button>
                
                </>

            } */}
            
                </CardActions>
            
            </Card>
            <Snackbar
                open={itemAddedSnackbar}
                autoHideDuration={2000}
                onClose={() => {setItemAddedSnackbar(false)}}
                // message={`${item.name} item was added to Basket!`}
                // action={action}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    <b>{capitalizeString(item.name)}</b> item was added to Basket!
                </Alert>
            </Snackbar>
            <Snackbar
                open={itemRemovedSnackbar}
                autoHideDuration={2000}
                onClose={() => {setItemRemovedSnackbar(false)}}
                // message={`${item.name} item was added to Basket!`}
                // action={action}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    <b>{capitalizeString(item.name)}</b> item was removed from Basket.
                </Alert>
            </Snackbar>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        itemsInBasket: state.basket.itemsInBasket, 
        userIsAuthenticated: state.user.isAuthenticated,
        user: state.user,
        items:state.items.items
    };
};

export default connect(mapStateToProps, {setCurrentItem, addItemToBasket, updateItemsBasket,saveCartAction})(Item);