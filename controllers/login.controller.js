var User = require('../models/user.model.js');
var md5 = require('md5')

module.exports.index = function(req, res) {
	res.render('login/index')
}

module.exports.checkLogin = function(req, res){
	var email = req.body.mail
	var pwd = req.body.pwd

	var errors = []

	var user = User.find({email : email});
	if (!user) {
		errors.push('Email not exist!!')	
	}

	var hashedPassword = md5(pwd)
	var pwd = User.find({password : hashedPassword});
	if (!pwd){
		errors.push('Wrong password!!')
	}

	if(errors.length) {
		res.render('login/index',{
			errors: errors,
			values: req.body
		})
		
		return
	}

	//set signed cookie
	res.cookie('userId',user.id,{
		signed: true
	})

	// neu correct het thi redirect den page users
	res.redirect('/users');

}