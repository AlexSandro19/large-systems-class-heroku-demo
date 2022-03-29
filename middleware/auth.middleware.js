const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ status:401,message: "Unauthorized access" });
    }
    const { userId, exp } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userId);
    req.user = await User.findById(userId).select(" password email emailConfirmed orders cart  username phone address firstName lastName role").populate({path:"orders",populate:{path:"items"}}).populate("cart").exec();
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status:401,
        message: "Session has expired, please login to obtain a new one",
      });
    }
    res.status(401).json({ message: "Unauthorized access" });
  }
};
