import { Button, Link } from "@mui/material";
import { Dialog,DialogContent,DialogTitle,DialogContentText,DialogActions } from "@mui/material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
const theme = createTheme()
const useStyles = makeStyles(() => ({
    paper: {
      color:"#989898",
      margin: theme.spacing(15,0,0,50),

    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
   
      color:"#989898",
      width: "100%", // Fix IE 11 issue.
  
      marginTop: theme.spacing(1),
    },
    textField:{
      
      color:"#989899"
    },
    dialog:{
      marginBottom:"10px"
    },
    input:{
      color:"#989898",
    },
    submit: {
      margin: theme.spacing(3, 1, 2),
    },
  }));
export const Auth=({modalOpen,handleClose,form,submitHandler,changeHandler,formErrors})=>{
    const classes= useStyles();

    return(
        <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">User Login</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText>
          
          </DialogContentText>
          <TextField
            style={{marginBottom:theme.spacing(2)}}
            required={true}
            onChange={changeHandler}
            autoFocus
            value={form.email}
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            error={!!formErrors["email"]}
            helperText={formErrors["email"] ? formErrors["email"] : ""}
          />
          <TextField
            className={classes.dialog}
            onChange={changeHandler}
            value={form.password}
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            error={!!formErrors["password"]}
            helperText={formErrors["password"] ? formErrors["password"] : ""}
          />
          <Link
          component={NavLink}
          variant="body2"
          to="/register"
          onClick={handleClose}
          >
            Register
          </Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
    )
}