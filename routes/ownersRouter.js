const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const productModel = require("../models/product-model");
const Order = require("../models/order-model");
const userModel = require("../models/user-model");

// DASHBOARD
router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard");
});

// PRODUCT LIST PAGE
router.get("/products-page", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    res.render("admin/products-page", { products });
  } catch (err) {
    req.flash("error", "Could not load products");
    res.redirect("/owners/dashboard");
  }
});

// ORDER LIST PAGE
router.get("/orders-page", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").lean();
    res.render("admin/orders-page", { orders });
  } catch (err) {
    req.flash("error", "Could not load orders");
    res.redirect("/owners/dashboard");
  }
});

// PRODUCT CREATE PAGE
router.get("/products-page/product", (req, res) => {
  res.render("admin/create-product", { success: req.flash("success") });
});

// PRODUCT EDIT FORM
router.get("/products-page/edit/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).lean();
    if (!product) return res.redirect("/owners/products-page");
    res.render("admin/edit-product", { product });
  } catch (err) {
    console.error("Edit fetch error:", err);
    res.redirect("/owners/products-page");
  }
});

// PRODUCT EDIT SUBMIT
router.post(
  "/products-page/edit/:id",
  upload.fields(
    ["image", "image1", "image2", "image3", "image4", "image5"].map(name => ({ name, maxCount: 1 }))
  ),
  async (req, res) => {
    try {
      const toArray = val => (Array.isArray(val) ? val : val ? [val] : []);

      const updateData = {
        name: req.body.name,
        category: toArray(req.body.category),
        material: toArray(req.body.material),
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        size: toArray(req.body.size),
        color: toArray(req.body.color),
        specific: req.body.specific,
        quantity: req.body.quantity
      };

      // Handle images
      Object.keys(req.files || {}).forEach(key => {
        if (req.files[key][0]) {
          updateData[key] = req.files[key][0].buffer;
        }
      });

      await productModel.findByIdAndUpdate(req.params.id, updateData);
      req.flash("success", "Product updated successfully!");
      res.redirect("/owners/products-page");
    } catch (err) {
      console.error("Product update error:", err);
      req.flash("error", "Failed to update product");
      res.redirect("/owners/products-page");
    }
  }
);

// PRODUCT DELETE SUBMIT
router.post("/products-page/delete/:id", async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted successfully!");
    res.redirect("/owners/products-page");
  } catch (err) {
    console.error("Product deletion error:", err);
    req.flash("error", "Failed to delete product");
    res.redirect("/owners/products-page");
  }
});


module.exports = router;
