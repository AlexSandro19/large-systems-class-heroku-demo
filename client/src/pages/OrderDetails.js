import React, { useEffect, useCallback } from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems} from "../redux/actions/item"
import OrderDetailsComponent from "../components/OrderDetailsComponent"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createOrderAction } from "../redux/actions/order";
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

const OrderDetails=({items, itemsInBasket, user, createOrderAction})=> {
    const classes=useStyles();
    console.log("User in OrderDetails", user)
    const history=useHistory()
    const goBack=()=>{
        history.goBack();
    }

    return (
        !itemsInBasket.length ? <Loader></Loader> : ( //if posts.length is 0 then is false, !false => true
            <>
        <OrderDetailsComponent goBack={goBack} user={user} itemsInBasket={itemsInBasket} createOrderAction={createOrderAction}>
        </OrderDetailsComponent>
        </>
    ))
}

const mapStateToProps = (state) => {
    return {
        itemsInBasket: state.basket.itemsInBasket, 
        user: state.user,
    };
};
    
export default connect(mapStateToProps,{createOrderAction})(OrderDetails)