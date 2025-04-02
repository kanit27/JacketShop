const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/users/login");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
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
            res.cookie("token", token);
            res.redirect("/");
          } catch (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/users/register");
          }
        }
      });
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/register");
  }
};

module.exports.userLogin = async function (req, res) {
  try {
    let { email, password } = req.body;

    

    // Check if the user is a regular user
    let user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/users/login");
    }

    const isUserMatch = await bcrypt.compare(password, user.password);
    if (!isUserMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/users/login");
    }

    let token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/users/login");
  }
};

module.exports.logoutUser = function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
};
