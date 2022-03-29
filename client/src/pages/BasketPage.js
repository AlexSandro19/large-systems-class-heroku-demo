import React from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems} from "../redux/actions/item"
import BasketPageComponent from "../components/BasketPageComponent"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {saveCartAction} from "../redux/actions/order";
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

const BasketPage=({itemsInBasket, items, user,saveCartAction})=> {
    const history=useHistory();
    const classes=useStyles();
    const goBack=()=>{
        history.goBack();
    }
    return (
        <BasketPageComponent goBack={goBack} itemsInBasket={itemsInBasket} items={items} user={user} saveCartAction={saveCartAction}>
        </BasketPageComponent>
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
        itemsInBasket: state.basket.itemsInBasket, 
        items: state.items.items,
        user: state.user
    };
};
    
export default connect(mapStateToProps,{saveCartAction})(BasketPage)