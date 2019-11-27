require('dotenv').config()

// require
var express = require('express')
var cookieParser = require('cookie-parser');

// constant
var app = express()
var port = 8080

// set 
app.set('views', './views')	// set thu muc goc cua cac file view
app.set('view engine', 'pug') // set engine dung cho cac file view

// use
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET)) // set up for signed cookie
//---------------------ENDED CONFIG -----------------------------

//route requrie
var userRoute= require('./route/user.route.js')
var loginRoute= require('./route/login.route.js')
var productRoute= require('./route/product.route.js')
var cartRoute= require('./route/cart.route.js')
var checkSessionId = require('./controllers/validates/validate.sessionId')

// use - route
app.use(checkSessionId) // ceheck Session ID cho tat ca cac duong dan ben duoi

app.use('/users', userRoute)
app.use('/login', loginRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)

// get
app.get('/', function(req, res) {
	res.render('index', {
		author: 'CuongDo'
	})
})

app.listen(port, function (){
	console.log('Express JS start : listening on port 8080')
})