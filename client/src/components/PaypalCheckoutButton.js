import {useState} from "react"
import { Button, Link } from "@mui/material";
import { connect } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js"
import { DateTime } from "luxon";

import {addItemToBasket, updateItemsBasket} from "../redux/actions/basket";

const PaypalCheckoutButton = ({user, createOrderAction, updateItemsBasket, history, itemsInBasket}) => {

    const [paidForOrder, setPaidForOrder] = useState(false);
    let total = 0;

    console.log("User in PaypalCheckoutButton", user)
    
    console.log("itemsInBasket in PaypalCheckoutButton", itemsInBasket)
    
    const countSameItems = (receivedItem) => {
        const sameItemArray = itemsInBasket.filter(item => receivedItem._id === item._id);
        return sameItemArray.length;
      } 
    
      const itemsToDisplay = []
      if (itemsInBasket.length){
        for (let i = 0; i < itemsInBasket.length; i++){
            console.log("Index in the beginning", i)
            const item = itemsInBasket[i]
            console.log("item in itemsToDisplay", item)
            const numberOfDuplicates = countSameItems(item) - 1
            console.log("numberOfDuplicates ", numberOfDuplicates)
            itemsToDisplay.push(item)
            i += numberOfDuplicates
            console.log("Index in the end", i)
          }
          console.log("items in itemsToDisplay", itemsToDisplay)
      
    }
      
      
    if (itemsToDisplay.length){
        total = itemsToDisplay.reduce((sum, item) => {return sum + item.price * countSameItems(item)}, 0)
       
    }
    console.log("Total", total)
    
    
    const itemsForPaypal = itemsToDisplay.map(item => ({name:item.name, quantity:countSameItems(item), unit_amount:{currency_code:"DKK", value:item.price}})) 
    console.log("itemsForPaypal", itemsForPaypal)
    const emptyOrder = {items:itemsInBasket, userId:user.id, totalValue:0, sent:"", delivered:"", ordered:"", message:"", orderPaid:false, paypalOrderId: ""}


    
    const handleApprove = (order) => {
        // save the order with orderID
        console.log("Paypal handleApprove called");
        if (order.id){
            console.log("Order.id ", order.id)
            const now = DateTime.fromISO(order.create_time)
            const nowToString = `${(now.day < 10) ? "0" : ""}${now.day}-${(now.month < 10) ? "0" : ""}${now.month}-${now.year}`
            const newOrder = {...emptyOrder, ordered:nowToString, totalValue:total,paypalOrderId:order.id,orderPaid:true}
            console.log("User", user)
            console.log("NewOrder ", newOrder)
            createOrderAction(newOrder,user.token)
            history.push("/orderConfirmation")
            // updateItemsBasket(0);
        }
        
        //setPaidForOrder(true);
        //update user.orders

        // setError("Your payment was was processed successfully. However, we are unable to fulfill your purchase. Please contact support")
        
        // if (paidForOrder) {
        //     //Display success message or send to confirmation page
        //     alert("Thank you for your purchase!") 
        // }
    }
    const payLaterButton = () => {
        console.log("PaypalCheckoutButton payLaterButton pressed")
        const now = DateTime.now()
        const nowToString = `${(now.day < 10) ? "0" : ""}${now.day}-${(now.month < 10) ? "0" : ""}${now.month}-${now.year}`
        const newOrder = {...emptyOrder, ordered:nowToString, totalValue:total}
        console.log("User", user)
        console.log("NewOrder ", newOrder)
        createOrderAction(newOrder,user.token);
        history.push("/orderConfirmation")
            // updateItemsBasket(0);
    }
        

    
    return (
        <>

        <PayPalButtons style={{ width: '400px' }} 
         
            createOrder={(data, actions) => {
                console.log("Paypal createOrder called");
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "DKK",
                                value: total,
                                breakdown: {
                                    item_total: {
                                        currency_code: "DKK",
                                        value: total
                                    }
                                }
                            },
                            items: itemsForPaypal,
                        }
                    ]
                })
            }}

            onApprove={ async(data, actions) => {
                const order = await actions.order.capture();
                console.log("Paypal order", order);
                console.log("Paypal data", data);

                console.log("Paypal onApprove called");
                handleApprove(order);
            }}

            onError={(err) => {
                console.log("error", err);
                console.log("Paypal onError called");
            }}

            onCancel={() => {
                //display cancel message, redirect to initial page
                console.log("Paypal onCancel called");
            }}

            onClick={(data, actions) => {
                //validate on button click, client or server side
               //if something is wrong, then call actions.reject()
               //if everything is fine, then call actions.resolve() which internally will call createOrder function
               console.log("Paypal onClick called");
            }}
        />
        
            <Button sx={{ width: '750px', marginBottom:"10px" }} onClick={payLaterButton} variant="contained">
            Pay Later
          </Button>
        </>
    )

}

export default PaypalCheckoutButton;