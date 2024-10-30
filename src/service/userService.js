const bcrypt = require('bcrypt')
const constant = require('../util/constant')
const { CustomError } = require('../util/errorHandler')

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async register(data) {
    try {
      const emailExists = await this.userRepository.findUserByEmail(data.emailAddress)
      if (emailExists) throw new CustomError(constant.EMAIL_ALREADY_USED, 409)

      const hashedPassword = await bcrypt.hash(data.password, 10)
      data.password = hashedPassword
      return await this.userRepository.createUser(data)
    } catch (e) {
      throw new CustomError(e.message || 'error register user', e.statusCode || 500)
    }
  }

  async login(data) {
    try {
      const emailExists = await this.userRepository.findUserByEmail(data.email)
      if (!emailExists || !(await bcrypt.compare(data.password, emailExists.password))) throw new CustomError(constant.INVALID_EMAIL_OR_PASSWORD, 400)

      const user = emailExists instanceof this.userRepository.userModel
                    ? emailExists.toJSON()
                    : emailExists
      delete user.password

      return user
    } catch (e) {
      throw new CustomError(e.message || 'error register user', e.statusCode || 500)
    }
  }
}

module.exports = UserService
