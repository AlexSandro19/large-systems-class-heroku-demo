import { Switch } from "react-router-dom";
import { Redirect, Route, } from "react-router-dom";
import HomePage  from "./pages/HomePage";
import { connect } from "react-redux";
import ShoppingPage from "./pages/ShoppingPage";
import ItemPage from "./pages/ItemPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import ContactForm from "./components/ContactForm";
import CreateItemPage from "./pages/CreateItemPage";
import BasketPage from "./pages/BasketPage";
import FormPage from "./pages/FormPage";
import Modeling from "./components/Modeling";
import EditOrderPage from "./pages/EditOrderPage";
import ViewOrderPage from "./pages/ViewOrderPage";
import EmailConfirmationPage from "./pages/EmailConfirmationPage";
import OrderDetails from "./pages/OrderDetails";
import OrderConfirmation from "./pages/OrderConfirmation";

const Routes=({currentItem})=>{
    return(
        <Switch>
            <Route path="/" exact><HomePage/> </Route>
            <Route path="/allitems" exact><ShoppingPage/> </Route>
            <Route path="/addToCart" exact></Route>
            <Route path="/item" exact><ItemPage currentItem={currentItem}/></Route>
            <Route path="/register" exact><RegistrationPage /></Route>
            <Route path="/profile" exact><ProfilePage /></Route>
            <Route path="/editItem/" exact><FormPage/></Route>
            <Route path="/editOrder/" exact><EditOrderPage></EditOrderPage></Route>
            <Route path="/viewOrder/" exact><ViewOrderPage></ViewOrderPage></Route>
            <Route path="/contact" exact><ContactForm/> </Route>
            <Route path="/basket" exact><BasketPage/></Route>
            <Route path="/createItem" exact><CreateItemPage></CreateItemPage></Route>
            <Route path="/updateItem" exact><FormPage/></Route>
            <Route path="/orderDetails" exact><OrderDetails/></Route>
            <Route path="/orderConfirmation" exact><OrderConfirmation/></Route>
            
            <Route path="/emailConfirmation/:hash" ><EmailConfirmationPage></EmailConfirmationPage></Route>
            <Route path="/modeling" exact><Modeling/></Route>
            {/*<Route path="/modeling" render={() => <Redirect
        to={{
          pathname: "index.html"
        }}
      />}/>*/}

            <Redirect to="/" ></Redirect>
        </Switch>
    )
}
const mapStateToProps = (state) => ({
    currentItem: state.items.currentItem
  });
  
 export default connect(mapStateToProps)(Routes);
