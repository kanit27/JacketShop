const express = require("express");
const upload = require("../config/multerConfig");
const productModel = require("../models/product-model");
const router = express.Router();

router.post(
  "/create-product/create",
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      let { name, price, description, category , specific, quantity, discount, color, size, material } = req.body;

      const images = req.files;
      const image = images.image ? images.image[0].buffer : null;
      const image1 = images.image1 ? images.image1[0].buffer : null;
      const image2 = images.image2 ? images.image2[0].buffer : null;
      const image3 = images.image3 ? images.image3[0].buffer : null;
      const image4 = images.image4 ? images.image4[0].buffer : null;
      const image5 = images.image5 ? images.image5[0].buffer : null;
      
      color = Array.isArray(color) ? color : [color];
      size = Array.isArray(size) ? size : [size];

      let product = await productModel.create({
        image,
        image1,
        image2,
        image3,
        image4,
        image5,
        name,
        price,
        quantity,
        description,
        category,
        discount,
        specific, 
        color : Array.isArray(color) ? color : [color],
        size : Array.isArray(size) ? size : [size],
        material,
      });
        req.flash("success", "Product created successfully");
        res.redirect("/owners/products-page");
    } catch (err) {
      res.send(err.message);
    }
  }
);



module.exports = router;
