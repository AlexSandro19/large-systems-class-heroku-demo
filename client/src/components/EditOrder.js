import {Box,TextField,Typography,Button} from "@mui/material";
import {useState} from "react";
import { useHistory } from "react-router-dom";
export const EditOrder=({formErrors,errors,user,currentOrder,updateOrder})=>{
    const history=useHistory()
    const format=(date)=>{
        // date.split("-").map((dateCheck)=>{
        //     if(!dateCheck){
        //         setForm({...currentOrder});
        //     }
        // })
        console.log(date);
        const formattedDate= date.split("-")[2]+"-"+ date.split("-")[1]+"-"+ date.split("-")[0];
        return formattedDate
    }
    console.log(currentOrder);
    const [form, setForm] = useState({
      ...currentOrder
    });
 

    const handleSubmit = (e) => { // e = event
        e.preventDefault();
        updateOrder(form,user.token);  
        // if(currentId){
        //     dispatch(updatePost(currentId, postData));
        // }else{
        //     dispatch(createPost(postData));
        // }
    }
    const cancel = () => {
        history.goBack();
    }

    return(

        <Box>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h6">{true ? 'Editing' : 'Creating'} an Order</Typography>
            <TextField name="message" variant="outlined" 
                       label="Message"  value={form.message}
                       error={!!formErrors["message"]}
                       helperText={formErrors["message"] ? formErrors["message"] : "Enter message for the delivery"}
                       onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <TextField placeholder="dd-MM-yyyy"  type="date" name="ordered" 
                       label="Ordered"   value={format(form.ordered)}
                       error={!!formErrors["ordered"]}
                       helperText={formErrors["ordered"] ? formErrors["ordered"] : "Enter date with format dd-MM-yyyy"}
                       onChange={(e) =>  setForm({ ...form, ordered: format(e.target.value) })}  />
            <TextField placeholder="dd-MM-yyyy" type="date"  name="sent" 
                       label="Sent" value={format(form.sent)}
                       error={!!formErrors["sent"]}
                       helperText={formErrors["sent"] ? formErrors["sent"] : "Enter date with format dd-MM-yyyy"}
                       onChange={(e) => setForm({ ...form, sent:  format(e.target.value)})}   />
            <TextField placeholder="dd-MM-yyyy"  name="delivered"  
                       label="Delivered" type="date" value={format(form.delivered)} 
                       error={!!formErrors["delivered"]}
                       helperText={formErrors["delivered"] ? formErrors["delivered"] : "Enter date with format dd-MM-yyyy"}
                       onChange={(e) => setForm({ ...form, delivered: format(e.target.value)})} />


            <Button  variant="contained" color="primary" size="large" type="submit">Submit</Button>
            <Button variant="outlined" size="small" onClick={cancel}>Cancel</Button>
        </form>
    </Box>
    )
}