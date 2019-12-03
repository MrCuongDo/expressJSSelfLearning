var User = require('../models/user.model.js');
var md5 = require('md5')


module.exports.index = async function(req, res) {
	// await: doi lay danh sach tat ca user sau do moi render
	var users = await User.find();

	res.render('users/index', {
		users: users
	})
}

module.exports.search =  async function(req, res) {
	// req.query lay cac parameters duoc truyen vao tu link vi du users/search?q=Cuong
	var searchValue = req.query.searchValue 
	var users = await User.find();
	var matchedUsers = users.filter(function(user){
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

module.exports.userDetail = async function(req, res){
	var id = req.params.id
	var user = await User.findById(id);
	res.render('users/userDetail',{
		user: user
	})
}

module.exports.postCreate = async  function(req, res){
	req.body.password = md5(req.body.password)
	req.body.fileUpload = req.file.path.split('/').slice(1).join('/')
	var newUser = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		fileUpload: req.body.fileUpload,
		phone: req.body.phone
	}
	var user = await User.create(newUser);
	res.redirect('/users') // redirect den trang users sau khi post
}