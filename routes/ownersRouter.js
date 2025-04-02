const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model")

router.get("/dashboard", (req, res) => {
    res.render("admin/dashboard");  // Ensure the correct path is used
});

router.get("/products-page", (req, res) => {
    res.render("admin/products-page");
});

router.get("/orders-page", (req, res) => {
    res.render("admin/orders-page");
});

router.get("/products-page/product", (req, res) => {
    let success = req.flash("success");
    res.render("admin/create-product", {success});
});

module.exports = router;