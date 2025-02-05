const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema ({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: []
    },
    image: String,
    bgcolor: String,
    panelcolor: String,
    textcolor: String
})

module.exports = mongoose.model('product', productSchema);