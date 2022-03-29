import { connect } from "react-redux";
import {useState,useEffect} from "react";
import { EditOrder } from "../components/EditOrder";
import {Loader} from "../components/Loader";
import {updateOrder} from "../redux/actions/order";
const EditOrderPage=({errors,user,currentOrder,updateOrder})=>{
   const [formErrors,setFormErrors]=useState({})
   useEffect(() => {
    if (errors) {
     
    errors.forEach((error) => {
       console.log(error);
        setFormErrors((i) => ({ ...i, [error.param]: error.msg }));
      });
    }
  }, [errors]);
    if(currentOrder === null){
        return(
            <Loader></Loader>
        )
    }
    return(
        <EditOrder formErrors={formErrors} user={user} updateOrder={updateOrder} currentOrder={currentOrder}>
        </EditOrder>
    )


}

const mapStateToProps = (state) => {
    return {
        currentOrder:state.order.currentOrder,
        user:state.user,
        errors:state.message.errors
    };
  };
  
export default connect(mapStateToProps,{updateOrder})(EditOrderPage)