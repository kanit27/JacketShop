const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost:27017/bagstore')
.then(function() {
    console.log('Connected to MongoDB');
})
.catch(function(err) {
    console.log('Failed to connect to MongoDB', err);
});

module.exports = mongoose.connection;