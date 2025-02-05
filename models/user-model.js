const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
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

module.exports = mongoose.model('user', userSchema);