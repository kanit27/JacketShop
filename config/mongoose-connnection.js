const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const dbgr = require("debug")("development:mongoose");

mongoose
.connect(`${uri}/jacketshop`)
.then(function() {
    dbgr("connected");
})
.catch(function(err) {
    dbgr("not connected", err);
});

module.exports = mongoose.connection;