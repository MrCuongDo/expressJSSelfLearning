var User = require('../../models/user.model.js');

module.exports.requireAuth = function(req, res, next) {
	if(!req.signedCookies.userId) {
		res.redirect('/login')
		return
	}

	var user = User.find({id : req.signedCookies.userId});
	if(!user){
		res.redirect('/login')
		return
	}

	next(); // di den middleware tip theo
}