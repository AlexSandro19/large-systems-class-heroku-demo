import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { TextField, Box, CardContent, CardMedia, Button, Typography,Grid } from '@mui/material';
import { contactFormRequest } from "../redux/actions/contact";

const useStyles = makeStyles((theme) => ({
   
    formEmail: {
        margin: "0",
        marginLeft:"25%",
        width:"1000px",
        color: "#989898",
        textAlign: "center",

    }, 
   
  }));

const ContactForm = ({messageResponse, contactFormRequest}) => {
    const history=useHistory();
    const [form,setForm] = useState({
        firstName:" ",
        lastName:" ",
        email:" ",
        subject:" ",
        message:" ",
    })
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    const classes = useStyles();
    const sendEmail = async (event) => {
        event.preventDefault();
        contactFormRequest(form)
        setForm({
            firstName:" ",
            lastName:" ",
            email:" ",
            subject:" ",
            message:" ",
        });
    }
    const goBack=()=>{
        history.goBack();
      }
    return (
        <div style={{width:"1000px" }}>
        <Grid container spacing={2}>
        <Grid item xs={12}> 
        <Grid item xs={12} > <Typography variant="h2" style={{textAlign:"center", marginLeft:"25%"}}> Contact Form</Typography> </Grid>
        <form className ={classes.formEmail} noValidate onSubmit={sendEmail} >
        <Grid item xs={12}><TextField sx={{ marginBottom: '15px' }}
            fullWidth
            label="First Name"
            required
            id = "outlined"
            value={form.firstName}
            name = "firstName"
            onChange={changeHandler}
            /></Grid>
         <Grid item xs={12}>  
         <TextField sx={{ marginBottom: '15px' }}
          fullWidth
            label="Last Name"
            required
            id = "outlined"
            value={form.lastName}
            name = "lastName"
            onChange={changeHandler}
            /></Grid> 
           <Grid item xs={12}> 
           <TextField sx={{ marginBottom: '15px' }}
            fullWidth
            label="Email"
            required
            onChange={changeHandler}
            value={form.email}
            type="email" 
            name="email"
            />
            </Grid> 
            <Grid item xs={12}> 
            <TextField sx={{ marginBottom: '15px' }}
             fullWidth
            label="Subject"
            required
            onChange={changeHandler}
            value={form.subject}
            type="text" 
            name="subject"
            />
            </Grid>
            <Grid item xs={12}>  
            <TextField sx={{ marginBottom: '15px' }}
             fullWidth
            label="Message"
            required
            value={form.message}
            onChange={changeHandler}
            type="text" 
            name="message"
            multiline
            rows={5}
            />
            </Grid>
            <Grid item xs={12}>       <Button
            type="submit" color="primary" variant="contained">Submit</Button> 
            </Grid>
        </form>
        <Button onClick={goBack} variant="outlined" color="primary">Back</Button></Grid>
        </Grid>
        </div>
          
    )
}

const mapStateToProps = (state) => {
    return { messageResponse: state.contact.message }
}

export default connect(mapStateToProps, { contactFormRequest })(ContactForm)
