var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
	sessionId : String,
	cart: [{productId : String , quantity: Number}]
});

var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;