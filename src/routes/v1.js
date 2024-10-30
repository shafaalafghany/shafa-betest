const express = require('express')
const Injector = require('../injector')

const router = express.Router()
const userController = Injector.userController()

router.post('/auth', userController.register.bind(userController))

module.exports = router
