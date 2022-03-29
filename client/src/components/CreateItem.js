import { TextField, Button,Box, Typography, Paper, InputLabel, Select,MenuItem } from "@mui/material";
import { Grid} from "@mui/material";
import { useState,useEffect } from "react"
import FileBase from 'react-file-base64';
import { useHistory } from "react-router-dom";

export const CreateItem = ({user,formErrors,errors,items,createItem})=>{
    const history= useHistory();
    const [form,setForm] = useState({});
    const updatedItemsList =[...items];
    const submitHandler = (event)=>{
        event.preventDefault();
        form.ratings={ratingsArray:[{userId:"6188f2447bfae277ce60e9f3",rating:4}],medianValueRating:4}
        updatedItemsList.push(form);
        createItem(updatedItemsList,form,user.token);
        history.goBack();
    }

    const cancel = () => {
        setForm({});
        history.goBack();
    }
    return(
        <div>
        <Grid container spacing={2}>
        <form autoComplete="off" noValidate>

        
        <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2" sx={{ marginBottom: '15px' }}>Create Item</Typography></Grid>
        <TextField name="name" variant="outlined" required sx={{ marginBottom: '15px' }}
                           label="Name" fullWidth value={form.name} 
                           onChange={(e) => setForm({ ...form, name: e.target.value })}
                           error={!!formErrors["name"]}
                         helperText={formErrors["name"] ? formErrors["name"] : ""} />
                <TextField name="description" variant="outlined" required sx={{ marginBottom: '15px' }}
                           label="Description" fullWidth value={form.description} multiline
                           onChange={(e) => setForm({ ...form, description: e.target.value })}
                           error={!!formErrors["description"]}
                       helperText={formErrors["description"] ? formErrors["description"] : ""} />
                <TextField name="price" variant="outlined"  required sx={{ marginBottom: '15px' }}
                           label="Price" fullWidth value={form.price} 
                           onChange={(e) => setForm({ ...form, price: e.target.value })} 
                           error={!!formErrors["price"]}
                       helperText={formErrors["price"] ? formErrors["price"] : ""}/>
                <TextField name="quantity" variant="outlined" required sx={{ marginBottom: '15px' }}
                           label="Quantity" fullWidth value={form.quantity} 
                           onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                           error={!!formErrors["quantity"]}
                       helperText={formErrors["quantity"] ? formErrors["quantity"] : ""} />
                <TextField name="categoryArray" variant="outlined" required sx={{ marginBottom: '15px' }}
                           label="Categories (put ',' between them)" fullWidth value={form.categoryArray} 
                           onChange={(e) => setForm({ ...form, categoryArray: e.target.value.split(',') })}
                           error={!!formErrors["categoryArray"]}
                       helperText={formErrors["categoryArray"] ? formErrors["categoryArray"] : ""} />
                <TextField name="materialArray" variant="outlined" required sx={{ marginBottom: '15px' }}
                           label="Materials  (put ',' between them)" fullWidth value={form.materialArray} 
                           onChange={(e) => setForm({ ...form, materialArray: e.target.value.split(',') })} 
                           error={!!formErrors["materialArray"]}
                       helperText={formErrors["materialArray"] ? formErrors["materialArray"] : ""}/>

                <InputLabel id="has-warranty">Warranty</InputLabel>
                <Select
                    sx={{ marginBottom: '15px' }}
                    fullWidth
                    required
                    name="hasWarranty"
                    labelId="has-warranty"
                    id="has-warranty-option"
                    error={!!formErrors["hasWarranty"]}
                    helperText={formErrors["hasWarranty"] ? formErrors["hasWarranty"] : ""}
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
                    sx={{ marginBottom: '15px' }}
                    fullWidth
                    name="isPopular"
                    error={!!formErrors["isPopular"]}
                    helperText={formErrors["isPopular"] ? formErrors["isPopular"] : ""}
                    required
                    labelId="is-popular"
                    id="is-popular-option"
                    value={form.isPopular}
                    // defaultValue={currentItem.hasWarranty}
                    label="Popular"
                    onChange={(e) => setForm({ ...form, isPopular: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                <InputLabel id="in-stock">In Stock</InputLabel>
                <Select
                    sx={{ marginBottom: '15px' }}
                    fullWidth
                    name="stock"
                    error={!!formErrors["stock"]}
                    helperText={formErrors["stock"] ? formErrors["stock"] : ""}
                    required
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
                    sx={{ marginBottom: '15px' }}   
                    fullWidth
                    type="file"
                    multiple={true}
                    onDone={(receivedPics) => {
                            const picturesArray = receivedPics.map(pic => pic.base64); 
                            setForm({ ...form, picturesArray });
                            }}
                />
                           
                <Button sx={{ margin: '15px' }} variant="contained" color="primary" size="large" type="submit" onClick={submitHandler}>Submit</Button>
                <Button sx={{ margin: '15px' }} variant="outlined" size="large" onClick={cancel}>Cancel</Button>
           </form>
           </Grid>
        </div>
    )

}