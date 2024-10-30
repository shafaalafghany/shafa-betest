const constant = require('../util/constant')
const validator = require('../util/validator')
const { SUCCESS } = require('../util/response')
const { CustomError } = require('../util/errorHandler')

const params = {
  registerParams: ["userName", "accountNumber", "emailAddress", "identityNumber", "password"]
}

class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async register(req, res, next) {
    try {
      const {
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
        password,
      } = req.body

      validator(req.body, params.registerParams)

      if (password.length < 8) throw new CustomError(constant.INVALID_PASSWORD, 400)
      
      const payload = {
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
        password,
      }

      const user = await this.userService.register(payload)

      return SUCCESS(res, 201, constant.SUCCESS_REGISTER, { username: userName, email: emailAddress })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = UserController
