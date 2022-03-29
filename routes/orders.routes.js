const { Router } = require("express");

const { check, validationResult } = require("express-validator");
const Furniture = require("../model/Furniture");
const User = require("../model/User")
const Order= require("../model/Order");
require("dotenv").config();
const auth= require("../middleware/auth.middleware");


const router = Router();


 
router.post("/updateOrder",auth,
[
check("_id","Try again. Error with the order").exists().isMongoId(),
check("items","Try again. Error with the order").exists(),
check("totalValue","Try again. Error with the order").exists(),
check("message","Try again. Error with the order").exists(),
check("sent","Try again. Error with the order").exists(),
check("ordered","Try again. Error with the order").exists().notEmpty(),
check("userId","Try again. Error with the order").exists(),
check("delivered","Try again. Error with the order").exists(),
]
,async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data while sending",
      });
     
   }
   const order = req.body;
   if(order.sent.split("-")[0] === "undefined"){ 
      order.sent=""
       //return res.status(500).json({message:"Invalid date selected",errors:[{value:checkOrder.sent,msg:"Invalid sent date selected",param:"sent"}]})
     } 
     if ( order.delivered.split("-")[0] === "undefined"){
      //return res.status(500).json({message:"Invalid date selected",errors:[{value:checkOrder.delivered,msg:"Invalid delivered date selected",param:"delivered"}]});
      order.delivered=""
    } 
    if ( order.ordered.split("-")[0] === "undefined"){
     order.ordered=""
      // return res.status(500).json({message:"Invalid date selected",errors:[{value:checkOrder.ordered,msg:"Invalid ordered date selected",param:"ordered"}]});
     }
     
   const updatedOrder = await Order.findByIdAndUpdate(order._id,order,{new:true});
   //console.log(updatedOrder);
   const updatedUser = await User.findById(req.user._id).select(" password emailConfirmed email orders cart  username phone address firstName lastName role").populate({path:"orders",populate:{path:"items"}}).populate("cart").exec();
   return res.status(200).json({updatedOrder:updatedOrder,user:updatedUser});
  }catch(error){
    console.log(error.message);
    return res.status(500).json({error:error,message:error.message})

  }
})
router.post("/orders",auth,async(req,res)=>{
    try{
      if(req.user.role === "ADMIN"){
        const allorders= await Order.find({}).populate("items");
        
        return res.status(200).json(allorders);
      }else{
        return res.status(400).json({message:"You do not have the needed access level"})
      }      
    } catch(error) {
        return res.status(404).json({ message: error.message });
    }
});
router.post("/order",auth,async(req,res)=>{

    try{
      const errors=  validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data while sending",
        });
     }

     const {orderId}=req.body;
     //console.log(orderId);
     const order = await Order.findOne({_id:orderId}).populate("items");
     console.log(order);
     if(!order){
         return res.status(400).json({message:"Order not found"})
     }
     return res.status(200).json(order);
    }catch(error){

        console.log(error.message);
        return res.status(500).json({error:error,message:error.message})
    }

})


router.post("/saveCart",auth,
    async (req, res) => {
      try {


        const {cart} = req.body;
        const user= req.user;
        user.cart = [...cart]
        await user.save();
        console.log("userToUpdate, ", user)
        return res.status(200).json({user:user,didUserUpdate:true});
        // if (Object.keys(savedItem).length !== 0){
        //   console.log("item updated successfully");
        //   return res.status(200).json(savedItem);
        // }else {
        //   console.log("item didnt update");
        // }
        // if (items.length === 0) {
        //   return res.status(404).json({ message: "No data available" });
        // }
        // console.log(items);
        // return res.status(200).json(items);
        
      } catch(error) {
        console.log(error);
          return res.status(404).json({ didUserUpdate: false, message: error });

      }

    }
); 
router.post("/deleteOrder",auth,async(req,res)=>{
  try{

    const {order} = req.body;
    console.log(order);
    await Order.findByIdAndDelete(order._id);
    const  allOrders = await Order.find({});
    return res.status(200).json(allOrders);
  }catch(error){
    console.log(error.message);
    return res.status(500).json({error:error,message:error.message})
  }
})
router.post("/createOrder",auth,async(req,res)=>{

  try{

    const data = req.body;

    const order = new Order({...data}).populate("items");
    console.log(order);
    await order.save();
    const user = req.user;
   // const userUpdated = await User.findOne({_id:order.userId}).populate("items");
    user.orders.push(order)
    user.cart = []
    await user.save();
    console.log("userUpdated ", user)
    //const addedOrderIndex = userUpdated.orders.length - 1
    //const addedOrderId = userUpdated.orders[addedOrderIndex]
    // const updatedOrders = [...user.orders, order._id];
    // console.log("updatedOrders ", updatedOrders)
    // console.log("updatedOrders ofter push ", updatedOrders)
    // await user.updateOne({_id: user._id}, {orders: updatedOrders})

    return res.status(201).json({orderCreated : order});
  }catch(error){

      console.log(error.message);
      return res.status(500).json({error:error,message:error.message,orderCreated : false})
  }

})
 

module.exports = router;