var express = require('express')
var controller = require('../controllers/product.controller')
var validateLogin = require('../controllers/validates/validate.login')

var router = express.Router()

router.get('/',controller.index )

module.exports = router