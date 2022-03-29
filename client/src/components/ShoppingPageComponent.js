import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Card, CardActionArea, ListItemButton,Tooltip, Checkbox, Radio, Button,CardContent,ListItem, ListItemIcon,ListItemText,Toolbar, List, Drawer, Grid, Box, Typography, ButtonBase, Badge, Divider, Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems, setFilteredItems} from "../redux/actions/item"
import {addItemToBasket} from "../redux/actions/basket";
import {Loader} from "./Loader"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
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
    fab:{
        margin: "-3%",
    },
    basket:{
    }

}))

export const ShoppingPageComponent=({goBack,items, itemsInBasket, userIsAuthenticated, addItemToBasket})=>{
    const classes=useStyles();
    const drawerWidth = 240;
    
    const history = useHistory()
    
    const [checked, setChecked] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemsReceived, setItemsReceived] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [emptyBasket, setEmptyBasket] = useState(false);
    const [emptyFilteredItemsList, setEmptyFilteredItemsList] = useState(false);
    
    useEffect( () => {
        const itemsInStock = items.filter(item => item.stock)
        console.log("itemsInStock ", itemsInStock)
        setFilteredItems([...itemsInStock]);
        setItemsReceived(true);
    }, [items])
  
    const basketButtonClicked = () => {
        if (itemsInBasket.length){
            setEmptyBasket(false);
            history.push("/basket")
        }else{
            setEmptyBasket(true);
        }
    }

    const filterItems = (filterOption) => () => {
        const itemsInStock = items.filter(item => item.stock)
        console.log("itemsInStock ", itemsInStock)
        setFilteredItems([...itemsInStock]);
        console.log(`Checkbox pressed ${filterOption}`);
        // const currentIndex = checked.indexOf(filterOption);
        const newChecked = [...checked];

        if ((typeof filterOption) === 'string'){
            const currentIndex = checked.indexOf(filterOption);
            if (currentIndex === -1) {
                newChecked.push(filterOption);
            } else {
                newChecked.splice(currentIndex, 1);
            }

        }
        if ((typeof filterOption) === 'number'){
            if ((typeof newChecked[0]) === 'number' && newChecked[0] === filterOption){
                newChecked.shift(); 
            }else if ((typeof newChecked[0]) === 'number' && newChecked[0] !== filterOption){
                newChecked.splice(0, 1, filterOption);
            }else if (newChecked.length === 0 || (typeof newChecked[0]) === 'string'){
                newChecked.unshift(filterOption); 
            }
        }

        

        setChecked(newChecked);
        console.log("newChecked", newChecked);
        const filtered = [];
        if (newChecked.length){
            newChecked.forEach(optionChecked => {
            const filteredItemsOnOption = itemsInStock.filter((item) => {
                let addItem = false;
                if (filtered.includes(item)) {
                    return false;
                }else {
                    if ((typeof optionChecked) === 'string'){
                        item.categoryArray.every(category => {
                            if (category === optionChecked){
                                addItem = true;
                                return false;  
                            }  
                            return true;
                        })
                    } 
                    return addItem;
                }
            })
            filtered.push(...filteredItemsOnOption);
        })
        if (!filtered.length && ((typeof newChecked[0]) !== 'number')){
            setFilteredItems(filtered) 
            setEmptyFilteredItemsList(true);
        }else if ((typeof newChecked[0]) === 'number'){
            let arrayToCheck;
            if (filtered.length === 0){
                arrayToCheck = itemsInStock;
            }else {
                arrayToCheck = filtered;
            }
            const filteredItemsOnPrice = arrayToCheck.filter((item) => item.price < newChecked[0]);
            console.log("filteredItemsOnPrice ", filteredItemsOnPrice);
            setFilteredItems(filteredItemsOnPrice) 
            if (!filteredItemsOnPrice.length) setEmptyFilteredItemsList(true);
        }else {
            setFilteredItems(filtered) 
            if (!filtered.length) setEmptyFilteredItemsList(true);
        }

        }

    }

    const capitalizeString = (initialStr) => {
        return initialStr
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };



    return (       
        (!filteredItems.length && !itemsReceived) ? <Loader></Loader> : ( //if posts.length is 0 then is false, !false => true
            <>         
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Divider/>
          <List>
          <ListItem>Filter items on Category</ListItem>
          {["bedroom", "kitchen", "living room", "dinning room"].map((filterOption) => {
        const labelId = `checkbox-list-label-${filterOption}`;

        return (
            <ListItem
            key={filterOption}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={filterItems(filterOption)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(filterOption) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={capitalizeString(filterOption)} />
            </ListItemButton>
          </ListItem>
        );
        })}
        <Divider/>
        <ListItem>Filter items on Price</ListItem>
        {[1000, 2000, 5000].map((filterOption) => {
        const labelId = `radio-list-label-${filterOption}`;
        return (
            <ListItem
            key={filterOption}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={filterItems(filterOption)} dense>
              <ListItemIcon>
                <Radio
                  edge="start"
                  checked={checked.indexOf(filterOption) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Price below ${filterOption}`} />
            </ListItemButton>
          </ListItem>
        );
        })}
          </List>
        </Box>
      </Drawer>
            <Grid container spacing={3} alignItems="stretch" >
                {filteredItems.map((item) => ( 
                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                        <Item item={item} />  
                    </Grid>      
                ))}
                <Grid item xs={12}>
                    <Button onClick={goBack} variant="outlined">Back</Button>    
                </Grid>

                {(emptyFilteredItemsList) 
                    ?   <Snackbar
                            open={() => {setOpenSnackbar(true)}}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                            autoHideDuration={2000}
                            onClose={() => {setOpenSnackbar(false); setEmptyFilteredItemsList(false);}}
                            // message={`${item.name} item was added to Basket!`}
                            // action={action}
                        >
                            <Alert severity="error" sx={{ width: '100%' }}>
                                <b>No items found with these filters. Try choosing other ones.</b>
                            </Alert>
                        </Snackbar>
                    :   (<> </>)

                }

                {userIsAuthenticated && emptyBasket 
                    ?
                    <Snackbar
                            open={emptyBasket}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                            autoHideDuration={2000}
                            onClose={() => {setEmptyBasket(false)}}
                            // message={`${item.name} item was added to Basket!`}
                            // action={action}
                        >
                            <Alert severity="info" sx={{ width: '100%' }}>
                                <b>No items are added in basket. Try adding some.</b>
                            </Alert>
                        </Snackbar>
                    :
                    (<> </>)
                }
            </Grid>
           
            {userIsAuthenticated ? 
                <Badge className={classes.fab} color="secondary" badgeContent={itemsInBasket.length}>
                     <Tooltip className={classes.fab} title="See added items in Basket" arrow>
                         <Fab className={classes.fab} onClick={basketButtonClicked} color="primary" aria-label="Shopping Bag" >
                             <ShoppingBasketIcon />
                         </Fab>
                         </Tooltip>
                     </Badge>
                     
                : <></>
            }

            
                     
            </>
    ))
}

