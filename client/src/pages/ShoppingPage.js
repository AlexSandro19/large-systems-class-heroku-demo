import React, { useEffect, useCallback } from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems} from "../redux/actions/item";
import {ShoppingPageComponent} from "../components/ShoppingPageComponent"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {updateItemsBasket} from "../redux/actions/basket";
import { useHistory } from "react-router-dom";

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

const ShoppingPage=({items, itemsInBasket, userIsAuthenticated, requestAllItems,user,updateItemsBasket})=> {
    const classes=useStyles();
    const fetchItems = useCallback(() => {requestAllItems()}, [])
    const history=useHistory();
    // requestAllItems();
    useEffect( () => {
        
        fetchItems();
        console.log("after getting data", items);
        if (user.cart){
            console.log("User.cart", user.cart)
            updateItemsBasket(user.cart)
        }
    }, [fetchItems])
    const goBack=()=>{
        history.goBack();
    }
    return (
        <ShoppingPageComponent goBack={goBack} items={items} itemsInBasket={itemsInBasket} userIsAuthenticated={userIsAuthenticated}>
        </ShoppingPageComponent>
             //<Grid  container alignItems="stretch" spacing={3}>
              /* {items.data.map((item) => (
                     <Grid key={item._id} item xs={12} sm={6}>
                        <Item item={item} />
                    </Grid>      
                  ))} */
            //</Grid>
       

    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items,
        itemsInBasket: state.basket.itemsInBasket, 
        userIsAuthenticated: state.user.isAuthenticated,
        user: state.user
    };
};
    
export default connect(mapStateToProps,{requestAllItems,updateItemsBasket})(ShoppingPage)