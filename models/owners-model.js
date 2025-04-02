const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownersModel = new Schema ({
    email: String,
    password: String,
    
});

module.exports = mongoose.model('owners', ownersModel);