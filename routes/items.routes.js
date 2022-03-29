const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const Furniture = require("../model/Furniture");
const User = require("../model/User")
require("dotenv").config();
const auth= require("../middleware/auth.middleware");

const router = Router();

// GET /api/items
router.get("/items",
    async (req, res) => {
      try {
        const allItems = await Furniture.find({});
        if (allItems.length === 0) {
          return res.status(404).json({ message: "No data available" });
        }
    
        return res.status(200).json(allItems);
        
      } catch(error) {
          return res.status(404).json({ message: error });
      }

    }
 );
 router.post("/deleteItem",auth,async(req,res)=>{
   try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data while sending",
      });
    }
    const deleteItem = req.body;
    //console.log(deleteItem);
    await Furniture.findByIdAndDelete(deleteItem._id);
    const allItems = await Furniture.find({});
    return res.status(200).json(allItems)
   }catch(error){
    console.log(error.message);
    return res.status(404).json({ message: error });
   }
 })
router.post("/createItem",
  auth,
  [
  check("name","Error with name property").isString().notEmpty().exists().escape(),
  check("description","Error with description property").isString().notEmpty().exists().escape(),
  check("price","Price should be a number not text").isNumeric(),
  check("price","Error with price property").notEmpty().exists(),
  check("quantity","Quantity should be a number not text").isNumeric(),
  check("quantity","Error with quantity property").notEmpty().exists(),
  check("categoryArray","Error with categorry property").isArray().notEmpty().exists(),
  check("materialArray","Error with material property").isArray().notEmpty().exists(),
  check("ratings","Error with the ratings set up").isObject().notEmpty().exists(),
  check("hasWarranty","Error with the warranty").isBoolean().notEmpty().exists(),
  check("isPopular","Error with the popularity").isBoolean().notEmpty().exists(),
  check("stock","Error with the stock property").isBoolean().notEmpty().exists(),
  ],async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data while sending",
      });
    }
    const item = req.body;
    await Furniture.create(item);
    return res.status(200).json({message:"Successfully created a new Item"});
  }catch(error){
    console.log(error.message);
    return res.status(404).json({ message: error,errors:[ { value: error, msg: error.message, },] });
  }
})
router.post("/updateItem",auth,
  [
    check("name","Error with name property").isString().notEmpty().exists().escape(),
    check("description","Error with description property").isString().notEmpty().exists().escape(),
    check("price","Price should be a number not text").isNumeric(),
    check("price","Error with price property").notEmpty().exists(),
    check("quantity","Quantity should be a number not text").isNumeric(),
    check("quantity","Error with quantity property").notEmpty().exists(),
    check("categoryArray","Error with categorry property").isArray().notEmpty().exists(),
    check("materialArray","Error with material property").isArray().notEmpty().exists(),
    check("ratings","Error with the ratings set up").isObject().notEmpty().exists(),
    check("hasWarranty","Error with the warranty").isBoolean().notEmpty().exists(),
    check("isPopular","Error with the popularity").isBoolean().notEmpty().exists(),
    check("stock","Error with the stock property").isBoolean().notEmpty().exists(),
    
],
    async (req, res) => {
      try {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid data while sending",
          });
        }
        console.log("api/updateItem is called");
        const updatedItem = req.body;
        const savedItem = await  Furniture.findByIdAndUpdate(updatedItem._id, updatedItem,  { new: true }); 
        
        return res.status(200).json(savedItem);
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
        console.log(error.message);
          return res.status(404).json({ message: error,errors:[{value:error,}] });

      }

    }
); 
 


module.exports = router;