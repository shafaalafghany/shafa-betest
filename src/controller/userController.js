const constant = require('../util/constant')
const { generateToken } = require('../util/jwt')
const validator = require('../util/validator')
const { SUCCESS } = require('../util/response')
const { CustomError } = require('../util/errorHandler')

const params = {
  registerParams: ["userName", "accountNumber", "emailAddress", "identityNumber", "password"],
  login: ["email", "password"],
  update: ["username", "accountNumber", "identityNumber"],
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

      await this.userService.register(payload)

      return SUCCESS(res, 201, constant.SUCCESS_REGISTER, { username: userName, email: emailAddress })
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      validator(req.body, params.login)

      const user = await this.userService.login({email, password})
      const token = generateToken(user)

      const data = {
        user,
        token,
      }

      return SUCCESS(res, 200, '', data)
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const id = req.auth.id
      const body = req.body

      validator(req.body, params.update)

      const user = await this.userService.update(body, id)

      return SUCCESS(res, 200, 'update user successful', user)
    } catch (e) {
      next(e)
    }
  }

  async get(req, res, next) {
    try {
      const id = req.auth.id

      const user = await this.userService.get(id)

      return SUCCESS(res, 200, '', user)
    } catch (e) {
      next(e)
    }
  }

  async getByAccountNumber(req, res, next) {
    try {
      const user = await this.userService.getByAccount(req.params.accountNumber)

      return SUCCESS(res, 200, '', user)
    } catch (e) {
      next(e)
    }
  }

  async getByIdentityNumber(req, res, next) {
    try {
      const user = await this.userService.getByIdentity(req.params.identityNumber)

      return SUCCESS(res, 200, '', user)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.auth.id

      await this.userService.delete(id)

      return SUCCESS(res, 200, 'delete user successful')
    } catch (e) {
      next(e)
    }
  }
}

module.exports = UserController
