const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownerModel = new Schema ({
    fullname: String,
    email: String,
    password: String,
    
});

module.exports = mongoose.model('owner', ownerModel);