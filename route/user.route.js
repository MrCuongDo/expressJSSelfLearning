var express = require('express')
var shortid = require('shortid');
var router = express.Router()
var db = require('../lowdb')


router.get('/', function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	})
})

router.get('/search', function(req, res) {
	// req.query lay cac parameters duoc truyen vao tu link vi du users/search?q=Cuong
	var searchValue = req.query.searchValue 
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
	})
	res.render('users/index', {
		users: matchedUsers,
		searchValue : searchValue
	})
})

router.get ('/create', function (req, res) {
	res.render('users/create')
})

router.get('/:id', function(req, res){
	var id = req.params.id
	var user = db.get('users').find({id : id}).value()
	res.render('users/userDetail',{
		user: user
	})
})

router.post('/create', function(req, res){
	var id = shortid.generate()
	req.body.id = id
	db.get('users').push(req.body).write()
	res.redirect('/users') // redirect den trang users sau khi post
})

module.exports = router