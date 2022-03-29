import { AppBar, ButtonBase, } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthPage  from "../pages/AuthPage";
import { connect } from "react-redux";
import {loginRequest} from "../redux/actions/auth";
import { Loader } from "./Loader";
import {unsetUser} from "../redux/actions/user"

import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

import { Card, CardActionArea, CardContent,ListItem, ListItemIcon,ListItemText, List, Drawer, Grid, Box, Badge, Divider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex + 1,
    },
   
  }));
  

 const Navigation =({requesting,successful,errors,loginRequest,unsetUser})=>{

  const drawerWidth = 240;
    
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);

    const handleClickOpen = () => {
      setModalOpen(true);
    };
    const logOut = ()=>{
      unsetUser(false);
      setModalOpen(false);
    }
    const handleClose = () => {
      setModalOpen(false);
    };
    if(requesting){
      return(<Loader></Loader>)
    }
    if(successful){
      return(<>
        <AppBar position="sticky" style={{backgroundColor:"#C4C4C4"}}  className={classes.appBar}  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            
            <Toolbar >
      
            <Typography variant="h5" className={classes.grow}>
            <ButtonBase
            component={NavLink}
            to="/"
            activeClassName="active"
            >
            <Typography variant="h5" className={classes.grow}>
            TREE
            </Typography>
            </ButtonBase>
            </Typography>
            <Button
            className={classes.button}
            color="inherit"
            component={NavLink}
            to="/allitems"
            activeClassName="active"
          >
            Shop
          </Button>
            <Button
            className={classes.button}
            component={NavLink}
            color="inherit"
            activeClassName="active"
            to="/profile"
          >
            Profile
          </Button>
          <Button
            component={NavLink}
            className={classes.button}
            color="inherit"
            activeClassName="active"
            to="/modeling"
          >
            3D Modeling
          </Button>
          <Button
          className={classes.button}
          color="inherit"
          component={NavLink}
          to="/contact"
          activeClassName="active"
          >

            Contact
          </Button>
          <Button
            component={NavLink}
            className={classes.button}
            color="inherit"
            onClick={logOut}
            activeClassName="active"
            to="/"
          >
            Logout
          </Button>
            </Toolbar>
        </AppBar>
        </>
        )
    }

    return(
        <>
        <AppBar position="sticky" style={{backgroundColor:"#C4C4C4"}}  className={classes.appBar}  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            
            
            <Toolbar>
      
            <Typography variant="h5" className={classes.grow}>
            <ButtonBase
            component={NavLink}
            to="/"
            activeClassName="active"
            >
            <Typography variant="h5" className={classes.grow}>
            TREE
            </Typography>
            </ButtonBase>
            </Typography>
            <Button
            className={classes.button}
            color="inherit"
            component={NavLink}
            to="/allitems"
            activeClassName="active"
          >
            All Items
          </Button>
          <Button
          className={classes.button}
          color="inherit"
          component={NavLink}
          to="/contact"
          activeClassName="active"
          >

            Contact
          </Button>
            <Button
            
            className={classes.button}
            color="inherit"
            onClick={handleClickOpen}
            activeClassName="active"
            to="/"
          >
            Login
          </Button>
            </Toolbar>
        </AppBar>

        
        <AuthPage modalOpen={modalOpen} handleClose={handleClose} ></AuthPage>
        </>
    )

}

const mapStateToProps = (state) => ({
    successful:state.auth.successful,
    requesting: state.auth.requesting,
    errors: state.auth.errors,
});

export default connect(mapStateToProps, { loginRequest,unsetUser })(
  Navigation
);