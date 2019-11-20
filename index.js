// require
var express = require('express')

// constant
var app = express()
var port = 8080

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

var users = [
		{id: 1, name: 'Cuong'},
		{id: 2, name: 'Binh'}
]

app.get('/users', function(req, res) {
	res.render('users', {
		users: users
	})
})

app.get('/users/search', function(req, res) {
	// req.query lay cac parameters duoc truyen vao tu link vi du users/search?q=Cuong
	var searchValue = req.query.searchValue 
	var matchedUsers = users.filter(function(user){
		return user.name.indexOf(searchValue) !== -1
	})
	res.render('users', {
		users: matchedUsers,
		searchValue : searchValue
	})
})

app.get ('/users/create', function (req, res) {
	res.render('create')
})

app.post('/users/create', function(req, res){
	res.send(req.body)
	var name = req.body.username
	var phone = req.body.phone
	var email = req.body.email

	users.push({id: 99, name: name})
	res.redirect('/users')
})

app.listen(port, function (){
	console.log('Express JS start : listening on port 8080')
})