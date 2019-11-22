var express = require('express')
var controller = require('../controllers/login.controller')

var router = express.Router()

router.get('/', controller.index )
router.post('/checkLogin',controller.checkLogin )

module.exports = router