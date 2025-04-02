const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {

  if (!req.cookies.token) {
    
    return res.redirect("/users/login");
  }

  

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
   

    const user = await userModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
     
      return res.redirect("/users/login");
    }

    req.user = user;
    next();
  } catch (err) {
   
    return res.redirect("/users/login");
  }
};
