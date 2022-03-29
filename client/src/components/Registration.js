import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { TextField,Grid, Typography,Button } from "@mui/material";
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

export const Registration=({goBack,formErrors,form,sendRegistrationForm,changeHandler})=>{
const classes=useStyles();
return(
    <div>
       
    <Box component="form"
    autoComplete="off"
    width="1000px"
    onSubmit={sendRegistrationForm}
    >
        
        <div>
        <Grid container spacing={4}>
        <Grid item xs={12}><Button variant="outlined" onClick={goBack}>Back</Button></Grid>
        <Grid item xs={12}><Typography  style={{width:"100%",textAlign:"center"}} variant="h2">Register</Typography></Grid>
        <Grid item xs={12}><TextField  error={!!formErrors["email"]}  helperText={formErrors["email"] ? formErrors["email"] : ""} type="email" value={form.email} onChange={changeHandler} style={{width:"100%"}} required label="Email" id="email" name="email" ></TextField></Grid>
        <Grid item xs={12}><TextField type="text" value={form.username} error={!!formErrors["username"]}  helperText={formErrors["username"] ? formErrors["username"] : ""}  onChange={changeHandler} style={{width:"100%"}}  required label="Username" id="username" name="username"></TextField></Grid>
        <Grid item xs={6}><TextField type="text" value={form.firstName} error={!!formErrors["firstName"]}  helperText={formErrors["firstName"] ? formErrors["firsName"] : ""} onChange={changeHandler} style={{width:"100%"}}  label="First Name" id="firstName" name="firstName"></TextField></Grid>
        <Grid item xs={6}><TextField type="text" value={form.lastName} error={!!formErrors["lastName"]}  helperText={formErrors["lastName"] ? formErrors["lastName"] : ""} onChange={changeHandler} style={{width:"100%"}}  label="Last Name" id="lastName" name="lastName"></TextField></Grid>
        <Grid item xs={12}><TextField type="password" value={form.password} error={!!formErrors["password"]}  helperText={formErrors["password"] ? formErrors["password"] : ""} onChange={changeHandler} style={{width:"100%"}}  required label="Password" id="password" name="password" ></TextField></Grid>
        <Grid item xs={12}><TextField type="password" onChange={changeHandler} error={!!formErrors["confirmPassword"]}  helperText={formErrors["confirmPassword"] ? formErrors["confirmPassword"] : ""} style={{width:"100%"}}  required label="Confirm password" id="confirmPassword" name="confirmPassword" ></TextField></Grid>
        <Grid item xs={7}><TextField type="tel" value={form.phone} rror={!!formErrors["phone"]}  helperText={formErrors["phone"] ? formErrors["phone"] : ""} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone"></TextField></Grid>

        <Grid item xs={12}><TextField type="text" onChange={changeHandler} multiline value={form.address} rror={!!formErrors["address"]}  helperText={formErrors["address"] ? formErrors["address"] : ""} style={{width:"100%"}}  label="Address" id="address" name="address"></TextField></Grid>
        <Grid item xs={5}>
        <Button 
        variant="contained"
        color="primary" type="submit"
        >
            Register
        </Button></Grid>

        </Grid>
        </div>
    </Box>
    </div>
)

}