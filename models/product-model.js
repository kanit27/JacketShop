const mongoose = require('mongoose');
const { Schema } = mongoose;

const productModel = new Schema ({
    name: String,
    price: Number,
    category: String,
    image: Buffer,
    image1: Buffer,
    image2: Buffer,
    image3: Buffer,
    image4: Buffer,
    image5: Buffer,
    quantity: Number,
    specific: String,
    category: String,
    description: String,
    discount: {
        type: Number,
        default: []
    },
    color: [String],
    size: [String],
    material: String
})

module.exports = mongoose.model('product', productModel);