const express = require('express')
const authenticateJWT = require('../middleware/auth_middleware')
const Injector = require('../injector')

const router = express.Router()
const userController = Injector.userController()

router.post('/auth', userController.register.bind(userController))
router.post('/auth/login', userController.login.bind(userController))
router.patch('/user', authenticateJWT, userController.update.bind(userController))
router.delete('/user', authenticateJWT, userController.delete.bind(userController))
router.get('/user', authenticateJWT, userController.get.bind(userController))
router.get('/user/account/:accountNumber', authenticateJWT, userController.getByAccountNumber.bind(userController))
router.get('/user/identity/:identityNumber', authenticateJWT, userController.getByIdentityNumber.bind(userController))

module.exports = router
