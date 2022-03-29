import { connect } from "react-redux";
import {useState} from "react";
import { ViewOrder } from "../components/ViewOrder";
import {Loader} from "../components/Loader";
const ViewOrderPage=({currentOrder})=>{
    console.log(currentOrder)
    if(!currentOrder){
        return(
            <Loader></Loader>
        )
    }
    return(
        <ViewOrder currentOrder={currentOrder}>
        </ViewOrder>
    )


}

const mapStateToProps = (state) => {
    return {
        currentOrder:state.order.currentOrder
    };
  };
  
export default connect(mapStateToProps,{})(ViewOrderPage)