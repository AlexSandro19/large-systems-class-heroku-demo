const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const Order = require("../model/Order");
const Furniture = require("../model/Furniture");
const auth = require("../middleware/auth.middleware");
//const { grantAccess } = require("../middleware/authorization.middleware");
const nodemailer = require("nodemailer");
require("dotenv").config();


const router = Router();
//POST /api/auth/updateUser
router.post("/updateUser",   
    [
      check("email","Enter valid email").isEmail(),
      check("password","Enter a valid password").exists().notEmpty(),
      check("passwordConfirm","Enter a valid confirmation password").exists().notEmpty(),
      check("firstName","Enter a valid first name").exists().notEmpty(),
      check("lastName","Enter a valid last name").exists().notEmpty(),
      check("username","Enter a valid username").exists().notEmpty(),
      check("phone","Enter a valid phone").exists().notEmpty(),
      check("address","Enter a valid address").exists().notEmpty(),
    ],async(req,res)=>{
      try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid data while registering",
          });
       }   
       const {firstName,lastName,username,address,phone,email, password,passwordConfirm } = req.body;

       if(password !== passwordConfirm){
        return res.status(400).json({
          message: "Confirm password is not correct",
          errors: [{ value: "password", msg: "Confirm password is not correct", param: "password" }],
        });
      }
      const user =  await User.findOne({ email }).select(" password email emailConfirmed orders cart username phone address firstName lastName role").populate({path:"orders",populate:{path:"items"}}).populate("cart").exec();
      user.firstName=firstName;
      user.lastName=lastName;
      user.username=username;
      user.address=address;
      user.phone=phone;
      user.email=email;
      user.password=await bcrypt.hash(password, 12);
      await user.save();
      return res.status(200).json(user);
      }catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Invalid authorization data",
          errors: [
            { value: error, msg: error.message },
          ],
        });
      }
    });
// POST /api/auth/register
 router.post(
   "/register",
   [
    check("email","Enter valid email").isEmail().notEmpty(),
    check("username","Enter a valid username").exists().notEmpty().escape(),
    check("password","Enter a valid password").exists().notEmpty().escape(),
    check("confirmPassword","Enter a valid confirmation password").exists().notEmpty().escape(),
    check("firstName","Enter a valid first name").isString().exists().notEmpty().escape(),
    check("lastName","Enter a valid last name").exists().notEmpty().escape(),
    check("phone","Enter a valid phone").exists().notEmpty().escape(),
    check("address","Enter a valid address").exists().notEmpty().escape(),
   ],
   async (req, res) => {
     try {
       console.log(req.body);
       const errors = validationResult(req);

       if (!errors.isEmpty()) {
         return res.status(400).json({
           errors: errors.array(),
           message: "Invalid data while registering",
         });
      }

      const {firstName,lastName,username,address,phone,email, password,confirmPassword } = req.body;
      const role="USER"; 
      const emailConfirmed=false;
      const orders=[];
      const cart=[];
      const candidateEmail = await User.findOne({ email });
      const candidateUsername = await User.findOne({username});
      if(password !== confirmPassword){
        return res.status(400).json({
          message: "Confirm password is not correct",
          errors: [{ value: "confirmPassword", msg: "Confirm password is not correct", param: "confirmPassword" }],
        });
      }
      else if (candidateEmail) {
         return res
           .status(400)
           .json({ message: "User with this email already exists",errors:[{value:email,msg:"User with this email already exists ",param:"email"}]});
       }
       else if (candidateUsername) {
        return res
          .status(400)
          .json({ message: "User with this username already exists",errors:[{value:username,msg:"User with this username already exists ",param:"username"}]});
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const confirmationHash= await (await bcrypt.hash(email, 12)).split("/")[0];
      const user = new User({ email, password: hashedPassword,role,firstName,lastName,username,address,confirmationHash,phone,cart,orders,emailConfirmed });

      await user.save();
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'testovtestov22@gmail.com',
          pass: process.env.EMAIL_PASSWORD
        }
      });
      console.log(confirmationHash);
      const mailOptions = {
        from: 'testovtestov22@gmail.com',
        to: email,
        replyTo:email,
        subject: `Email confirmation for ${firstName} ${lastName}`,
        text:`Thank you for creating a profile on our website. To confirm your profile please click the link specified
          Link: https://kea-final-project.herokuapp.com/emailConfirmation/${confirmationHash}
        `,
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Error ", error)
          return res.status(500).json({
            message: "",
            errors: [
              { value: error, msg: error.message, },
            ],
          });
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
       return res.status(201).json({ message: "User account created" });
     } catch (error) {
      return res.status(500).json({
        message: "",
        errors: [
          { value: error, msg: error.message, },
        ],
      });
     }
}
);
router.post("/confirmation",[check("hash").exists().notEmpty(),],async(req,res)=>{
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data sent for confirmation",
      });
    }
    const {hash}= req.body;

    const user= await User.findOne({confirmationHash:hash});
  
    if(user){
      if(user.emailConfirmed){
        res.status(200).json({message:"Email was already confirmed",emailConfirmed:true})
      }
      user.emailConfirmed = true;
      user.confirmationHash = " ";
      await user.save();
      res.status(200).json({message:"Successfully confirmed email",emailConfirmed:true});
    }else{
      res.status(500).json({ message: "User not found" ,errors:[{value:"email",msg:"User not found"}]});
    }
  }catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Invalid data",
      errors: [
        { value: error, msg: error.message },
      ],
    });
  }

})
// POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter valid email").isEmail(),
    check("password", "Enter password").exists().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid authorization data",
        });
      }

      const { email, password } = req.body;

      const userCheck = await User.findOne({ email }).select(" password email orders cart emailConfirmed username phone address firstName lastName role").populate({path:"orders",populate:{path:"items"}}).populate("cart").exec();
      
      if (!userCheck) {
        return res.status(400).json({
          message: "Invalid authorization data",
          errors: [{ value: email, msg: "User not found", param: "email" }],
        });
      }
      const user = await User.findOne({ email }).select(" password email orders cart emailConfirmed username phone address firstName lastName role").populate({path:"orders",populate:{path:"items"}}).populate("cart").exec();
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid authorization data",
          errors: [
            { value: "", msg: "Wrong password, try again", param: "password" },
          ],
        });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
      });
      res.json({ token,exp: token.exp, userId: user.id, role: user.role,email:user.email,emailConfirmed:user.emailConfirmed,username:user.username,firstName:user.firstName,lastName:user.lastName,cart:user.cart,phone:user.phone,address:user.address,orders:user.orders});
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Invalid data",
        errors: [
          { value: error, msg: error.message },
        ],
      });
    }
  }
);

router.post("/refreshUser",auth,async(req,res)=>{

  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid authorization data",
      });
    }
    const user =req.user;
  
 
    res.json({userId: user.id, role: user.role,email:user.email,emailConfirmed:user.emailConfirmed,username:user.username,firstName:user.firstName,lastName:user.lastName,cart:user.cart,phone:user.phone,address:user.address,orders:user.orders});
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Invalid data",
      errors: [
        { value: error, msg: error.message },
      ],
    });
  }

})

module.exports = router;
