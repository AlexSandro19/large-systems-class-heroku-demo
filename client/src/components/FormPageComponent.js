import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import {requestAllItems, setCurrentItem} from "../redux/actions/item";
import { TextField, Button,Box, Typography, Paper, InputLabel, Select,MenuItem } from "@mui/material";
import FileBase from 'react-file-base64';
import {updateItem, createItem} from "../redux/actions/item";

const FormPageComponent = ({formErrors, user,currentItem, items, setCurrentItem, updateItem }) => {
    const history = useHistory();
    const [form, setForm] = useState({...currentItem});
    // const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''});

    // const post = useSelector( (state) => currentId ? state.posts.find((p) => p._id === currentId) : null); 
    // const classes = useStyles();
 
    // useEffect(() => {
    //     if(post) {setPostData(post)};
    // }, [post])

    const handleSubmit = (e) => { // e = event
        updateItem(user,form,user.token);
        e.preventDefault();
    }

    const cancel = () => {
        //setForm({...currentItem});
        history.goBack()
    }

    
    return (
        <Box>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{false ? 'Editing' : 'Creating'} an Item</Typography>
                <TextField name="name" variant="outlined"  sx={{ marginBottom: '15px' }}
                           label="Name" fullWidth value={form.name} 
                           onChange={(e) => setForm({ ...form, name: e.target.value })} 
                           error={!!formErrors["name"]}
                           helperText={formErrors["name"] ? formErrors["name"] : ""}/>
                <TextField name="description" variant="outlined"  sx={{ marginBottom: '15px' }}
                           label="Description" fullWidth value={form.description} multiline
                           onChange={(e) => setForm({ ...form, description: e.target.value })} 
                           error={!!formErrors["description"]}
                           helperText={formErrors["description"] ? formErrors["description"] : ""}/>
                <TextField name="price" variant="outlined"  sx={{ marginBottom: '15px' }}
                           label="Price" fullWidth value={form.price} 
                           onChange={(e) => setForm({ ...form, price: e.target.value })}
                           error={!!formErrors["price"]}
                           helperText={formErrors["price"] ? formErrors["price"] : ""} />
                <TextField name="quantity" variant="outlined"  sx={{ marginBottom: '15px' }}
                           label="Quantity" fullWidth value={form.quantity} 
                           onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
                           error={!!formErrors["quantity"]}
                           helperText={formErrors["quantity"] ? formErrors["quantity"] : ""}/>
                <TextField name="categoryArray" variant="outlined"  sx={{ marginBottom: '15px' }}
                           label="Categories (put ',' between them)" fullWidth value={form.categoryArray} 
                           onChange={(e) => setForm({ ...form, categoryArray: e.target.value.split(',') })} 
                           error={!!formErrors["categoryArray"]}
                           helperText={formErrors["categoryArray"] ? formErrors["categoryArray"] : ""}/>
                <TextField name="materialArray" variant="outlined"  sx={{ marginBottom: '15px' }}
                           label="Materials  (put ',' between them)" fullWidth value={form.materialArray} 
                           onChange={(e) => setForm({ ...form, materialArray: e.target.value.split(',') })} 
                           error={!!formErrors["materialArray"]}
                           helperText={formErrors["materialArray"] ? formErrors["materialArray"] : ""}/>

                <InputLabel id="has-warranty">Warranty</InputLabel>
                <Select
                    fullWidth 
                    sx={{ marginBottom: '15px' }}
                    name="hasWarranty"
                    error={!!formErrors["hasWarranty"]}
                    helperText={formErrors["hasWarranty"] ? formErrors["hasWarranty"] : ""}
                    labelId="has-warranty"
                    id="has-warranty-option"
                    value={form.hasWarranty}
                    // defaultValue={currentItem.hasWarranty}
                    label="Warranty"
                    onChange={(e) => setForm({ ...form, hasWarranty: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                <InputLabel id="is-popular">Popular</InputLabel>
                <Select
                    fullWidth
                    sx={{ marginBottom: '15px' }}
                    name="isPopular"
                    labelId="is-popular"
                    id="is-popular-option"
                    value={form.isPopular}
                    error={!!formErrors["isPopular"]}
                    helperText={formErrors["isPopular"] ? formErrors["isPopular"] : ""}
                    label="Popular"
                    onChange={(e) => setForm({ ...form, isPopular: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                <InputLabel id="in-stock">In Stock</InputLabel>
                <Select
                    fullWidth
                    sx={{ marginBottom: '15px' }}
                    name="stock"
                    error={!!formErrors["stock"]}
                    helperText={formErrors["stock"] ? formErrors["stock"] : ""}
                    labelId="in-stock"
                    id="in-stock-option"
                    value={form.stock}
                    // defaultValue={currentItem.hasWarranty}
                    label="In Stock"
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>

          
                <FileBase 
                    type="file"
                    multiple={true}
                    onDone={(receivedPics) => {
                            const picturesArray = receivedPics.map(pic => pic.base64); 
                            setForm({ ...form, picturesArray });
                            }}
                />
                           
                <Button  sx={{ margin: '15px' }} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
                <Button sx={{ margin: '15px' }} variant="outlined" size="large" onClick={cancel} >Cancel</Button>
            </form>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        itemsInBasket: state.basket.itemsInBasket, 
        userIsAuthenticated: state.user.isAuthenticated,
    };
};

export default connect(mapStateToProps, {setCurrentItem, updateItem})(FormPageComponent);