import React, { useState,useEffect } from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems} from "../redux/actions/item"
import FormPageComponent from "../components/FormPageComponent"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

const FormPage=({errors,currentItem, items})=> {
    const classes=useStyles();
    const [formErrors,setFormErrors]=useState({});
    useEffect(() => {
        if (errors) {
        errors.forEach((error) => {
           console.log(error);
            setFormErrors((i) => ({ ...i, [error.param]: error.msg }));
          });
        }
      }, [errors]);
    return (
        <FormPageComponent formErrors={formErrors} currentItem={currentItem} items={items}>
        </FormPageComponent>
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
        items: state.items,
        currentItem: state.items.currentItem,
        errors:state.message.errors,
    };
};
    
export default connect(mapStateToProps,{})(FormPage)