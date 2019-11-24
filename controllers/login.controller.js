var db = require('../lowdb')
var md5 = require('md5')

module.exports.index = function(req, res) {
	res.render('login/index')
}

module.exports.checkLogin = function(req, res){
	var email = req.body.mail
	var pwd = req.body.pwd

	var errors = []

	var user = db.get('users').find({email : email}).value()
	if (!user) {
		errors.push('Email not exist!!')	
	}

	var hashedPassword = md5(pwd)
	var pwd = db.get('users').find({password : hashedPassword}).value()
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