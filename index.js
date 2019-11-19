var express = require('express')
var app = express()
var port = 8080

app.get('/', function(req, res) {
	res.send('<h1>hello Cuong!</h1>')
})

app.get('/users', function(req, res) {
	res.send('<h1>hello Users!</h1>')
})

app.listen(port, function (){
	console.log('Express JS start : listening on port 8080')
})