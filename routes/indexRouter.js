const express = require("express");
const router = express.Router();

// Load environment variables from.env file

const Stripe = require("stripe");
const dotenv = require("dotenv");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await productModel.find({}).lean();
  const user = await userModel.findOne({ email: req.user.email }).lean();
  let success = req.flash("success");
  let error = req.flash("error");
  res.render("shop", { products , user, error, success });
});

// Show Wishlist Page
router.get("/wishlist", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("wishlist")
      .lean();
    res.render("wishlist", { user });
    // console.log(user.wishlist);
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});

// Add Product to Wishlist
router.get("/wishlist/:product_id", isLoggedIn, async (req, res) => {
  try {
    // Fetch user from database
    const user = await userModel.findById(req.user._id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }

    // Add product to wishlist only if not already present
    if (!user.wishlist.includes(req.params.product_id)) {
      user.wishlist.push(req.params.product_id);
      await user.save();
      req.flash("success", "Product added to wishlist");
    } else {
      req.flash("error", "Product is already in your wishlist");
    }

    res.redirect("/shop");
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});

// Remove Product from Wishlist

router.get("/wishlist/:product_id/remove", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!req.user) {
      req.flash("error", "User not authenticated");
      return res.redirect("/login");
    }

    // Remove product from only the logged-in user's wishlist

    // Delete the product from the database
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.product_id.toString()
    );
    await user.save();
    // Delete the product from the database
    // const deletedUser = await productModel.findByIdAndDelete(req.params.product_id);

    req.flash("success", "Product removed from wishlist and deleted");

    res.redirect("/wishlist");
  } catch (error) {
    console.error("❌ Error removing from wishlist:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/wishlist");
  }
});

router.get("/bag", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("bag")
    .lean();
  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/shop");
  }
  res.render("bag", { user });
});

router.get("/bag/:product_id", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }
    if (!user.bag.includes(req.params.product_id)) {
      user.bag.push(req.params.product_id);
      await user.save();
      req.flash("success", "Product added to bag");
    } else {
      req.flash("error", "Product is already in your bag");
    }
    res.redirect("/shop");
  } catch (error) {
    console.error("❌ Error adding to bag:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});

router.get("/bag/:product_id/remove", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!req.user) {
      req.flash("error", "User not authenticated");
      return res.redirect("/login");
    }

    // Remove product from only the logged-in user's wishlist

    // Delete the product from the database
    user.bag = user.bag.filter(
      (id) => id.toString() !== req.params.product_id.toString()
    );
    await user.save();
    // Delete the product from the database
    // const deletedUser = await productModel.findByIdAndDelete(req.params.product_id);
    // Delete the product from the database

    req.flash("success", "Product removed from bag and deleted");

    res.redirect("/bag");
  } catch (error) {
    console.error("❌ Error removing from bag:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/bag");
  }
});

router.get("/checkout", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("bag")
      .lean();
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/shop");
    }
    res.render("checkout", { user });
  } catch (error) {
    console.error("❌ Error fetching checkout data:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/bag");
  }
});



dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// API to create a payment
router.post("/pay", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
