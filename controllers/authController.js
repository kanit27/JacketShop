const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;
    console.log("Register attempt:", fullname, email);

    if (!fullname || !email || !password) {
      req.flash("error", "Please fill in all fields");
      return res.redirect("/users/register");
    }

    let user = await userModel.findOne({ email });
    if (user) {
      console.log("User already exists:", email);
      req.flash("error", "User already exists");
      return res.redirect("/users/login");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          console.log("Bcrypt error:", err);
          req.flash("error", err.message);
          return res.redirect("/users/register");
        } else {
          try {
            let user = await userModel.create({
              fullname,
              email,
              password: hash,
            });
            let token = generateToken(user);
            console.log("User created, token:", token);
            res.cookie("token", token, {
              httpOnly: true,
              sameSite: "lax",
              path: "/", 
              // secure: true, 
            });
            res.redirect("/shop");
          } catch (err) {
            console.log("User creation error:", err);
            req.flash("error", "Something went wrong");
            res.redirect("/users/register");
          }
        }
      });
    });
  } catch (err) {
    console.log("Register catch error:", err);
    req.flash("error", err.message);
    res.redirect("/users/register");
  }
};

module.exports.userLogin = async function (req, res) {
  try {
    let { email, password } = req.body;
    console.log("Login attempt:", email);

    if (!email || !password) {
      req.flash("error", "Please fill in all fields");
      return res.redirect("/users/login");
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      req.flash("error", "Invalid email or password");
      return res.redirect("/users/login");
    }

    const isUserMatch = await bcrypt.compare(password, user.password);
    if (!isUserMatch) {
      console.log("Password mismatch for:", email);
      req.flash("error", "Invalid email or password");
      return res.redirect("/users/login");
    }

    let token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY
    );
    console.log("Login successful, token:", token);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    console.log("Login catch error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/users/login");
  }
};

module.exports.logoutUser = function (req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/", // Make sure this matches the path used when setting the cookie
  });
  res.redirect("/users/login");
};
