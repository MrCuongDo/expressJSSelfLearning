var express = require('express')
var controller = require('../controllers/user.controller')
var validate = require('../controllers/validates/validate.users')
var validateLogin = require('../controllers/validates/validate.login')

var router = express.Router()

router.get('/',validateLogin.requireAuth ,controller.index )

router.get('/search',validateLogin.requireAuth ,controller.search )

router.get ('/create',validateLogin.requireAuth , controller.create )

router.get('/:id',validateLogin.requireAuth ,controller.userDetail)

router.post('/create',validateLogin.requireAuth ,validate.postCreate ,controller.postCreate)

module.exports = router