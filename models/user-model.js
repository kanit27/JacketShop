const mongoose = require('mongoose');
const { Schema } = mongoose;

const userModel = new Schema ({
    fullname: String,
    email: String,
    password: String,
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    bag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    orders:{
        type: Array,
        default: []
    },
    isadmin: Boolean,
    date: {
        type: Date,
        default: Date.now
    },
    address: String,
    phone: String
});

module.exports = mongoose.model('user', userModel);