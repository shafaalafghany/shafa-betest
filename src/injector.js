const User = require('./model/user')
const redis = require('./model/redis')
const UserRepository = require('./repository/userRepository')
const UserService = require('./service/userService')
const UserController = require('./controller/userController')

class Injector {
  static userRepository() {
    return new UserRepository(User, redis)
  }

  static userService() {
    return new UserService(Injector.userRepository())
  }

  static userController() {
    return new UserController(Injector.userService())
  }
}

module.exports = Injector
