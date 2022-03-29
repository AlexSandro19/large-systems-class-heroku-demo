import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton } from "@mui/material";
import MessagePage from "./pages/MessagePage"
import Routes from "./routes";
import Navigation  from "./components/Navigation";
const theme = createTheme()



const useStyles = makeStyles(() => ({
 
  root: {
    backgroundColor:"#FFE6B6",
    color:"#000000",
    width:"100%",
    height: '100%',
  },
  content: {
    width:"100%",
    height:"100%",
    flexGrow: 2,
    padding:theme.spacing(8),
    display: "flex",
    flexDirection:"row",
   
  },
  footer:{
    paddingTop:"10%",
  }
  
}));

function App() {

  console.log("REACT_APP_PAYPAL_CLIENT_ID: ",process.env.REACT_APP_PAYPAL_CLIENT_ID);
  const classes = useStyles();
  return (
    // <PayPalScriptProvider options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID, "currency":"DKK", "disable-funding":"credit,card"}} > // to hide the credit card option
    <PayPalScriptProvider options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID, "disable-funding":"credit,card", "currency":"DKK"}} >
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <Navigation/>
      <MessagePage/>
      <main className={classes.content}>
      <Routes />
      </main>
      <footer className={classes.footer}>
        <IconButton>
        <FacebookIcon/>
        </IconButton>
        <IconButton> <InstagramIcon/></IconButton>
        <IconButton>  <LinkedInIcon/></IconButton>
      </footer>
    </div>
    </Router>
    </PayPalScriptProvider>
  );
}

export default App;
