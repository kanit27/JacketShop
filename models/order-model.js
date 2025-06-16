const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  products: [
    {
      name: String,
      price: Number,
      image: String,
      category: String,
      material: String,
      quantity: { type: Number, default: 1 }
    }
  ],
  shipping: {
    fullname: String,
    email: String,
    address: String,
    city: String,
    zipCode: String,
    country: String,
    phone: String
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Order", orderSchema);