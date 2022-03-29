const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const auth = require("../middleware/auth.middleware");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = Router();

router.post("/contact", 
[check("email", "Enter valid email").normalizeEmail().isEmail()],

    async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid authorization data",
        });
      }

      const { firstName, lastName, email, subject, message } = req.body;
      
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'testovtestov22@gmail.com',
          pass: process.env.EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: 'testovtestov22@gmail.com',
        to: "testovtestov22@gmail.com",
        replyTo:email,
        subject: subject,
        text:"Email sent from: "+email+' \n Name: '+firstName+' '+lastName+'\n Message: '+message+' ',
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
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
      res.status(200).json({ message: "successfully emailed me "});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Invalid data" ,errors:[{value:error,value:error.message}]});
    }
  }


)

module.exports = router;