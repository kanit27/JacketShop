const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    fullname: String,
    email: String,
    password: String,
    
});

module.exports = mongoose.model('owner', userSchema);