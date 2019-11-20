// require
var express = require('express')
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var shortid = require('shortid');

// constant
var app = express()
var port = 8080
var adapter = new FileSync('db.json')
var db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({users: []})
  .write()

// set 
app.set('views', './views')	// set thu muc goc cua cac file view
app.set('view engine', 'pug') // set engine dung cho cac file view

// use
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// get
app.get('/', function(req, res) {
	res.render('index', {
		author: 'CuongDo'
	})
})

app.get('/users', function(req, res) {
	res.render('users/users', {
		users: db.get('users').value()
	})
})

app.get('/users/search', function(req, res) {
	// req.query lay cac parameters duoc truyen vao tu link vi du users/search?q=Cuong
	var searchValue = req.query.searchValue 
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
	})
	res.render('users/users', {
		users: matchedUsers,
		searchValue : searchValue
	})
})



app.get ('/users/create', function (req, res) {
	res.render('users/create')
})

app.get('/users/:userId', function(req, res){
	var userId = req.params.userId
	var user = db.get('users').find({id : userId}).value()
	res.render('users/userDetail',{
		user: user
	})
})

app.post('/users/create', function(req, res){
	var id = shortid.generate()
	req.body.id = id
	db.get('users').push(req.body).write()
	res.redirect('/users') // redirect den trang users sau khi post
})

app.listen(port, function (){
	console.log('Express JS start : listening on port 8080')
})