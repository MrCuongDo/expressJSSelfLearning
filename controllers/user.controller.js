var db = require('../lowdb')
var shortid = require('shortid');

module.exports.index = function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	})
}

module.exports.search = function(req, res) {
	// req.query lay cac parameters duoc truyen vao tu link vi du users/search?q=Cuong
	var searchValue = req.query.searchValue 
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
	})
	res.render('users/index', {
		users: matchedUsers,
		searchValue : searchValue
	})
}

module.exports.create = function (req, res) {
	res.render('users/create')
}

module.exports.userDetail =  function(req, res){
	var id = req.params.id
	var user = db.get('users').find({id : id}).value()
	res.render('users/userDetail',{
		user: user
	})
}

module.exports.postCreate = function(req, res){
	var id = shortid.generate()
	var errors = []
	if(!req.body.name) {
		errors.push('Name is required!!!')
	}
	if(!req.body.phone) {
		errors.push('Phone is required!!!')
	}

	if(errors.length) {
		res.render('users/create',{
			errors : errors,
			values: req.body
		})
		return;
	}
	req.body.id = id
	db.get('users').push(req.body).write()
	res.redirect('/users') // redirect den trang users sau khi post
}