const constant = require('../util/constant')
const { CustomError } = require('../util/errorHandler')

class UserRepository {
  constructor(userModel, redis) {
    this.userModel = userModel
    this.redis = redis
  }

  async createUser(data) {
    try {
      return await this.userModel.create(data)
    } catch (e) {
      throw new CustomError(constant.FAILED_CREATE_USER)
    }
  }

  async findUserByEmail(email) {
    try {
      const cachedUser = await this.redis.get(`userEmail:${email}`)
      if (cachedUser) return JSON.parse(cachedUser)

      const user = await this.userModel.findOne({
        emailAddress: email,
        updatedAt: null,
      })
      if (user) await this.redis.set(`userEmail:${email}`, JSON.stringify(user), 3600)

      return user
    } catch (e) {
      throw new CustomError(constant.FAILED_FIND_USER)
    }
  }

  async findUserById(id) {
    try {
      const cachedUser = await this.redis.get(`userId:${id}`)
      if (cachedUser) return JSON.parse(cachedUser)

      const user = await this.userModel.findOne({
        _id: id,
        deletedAt: null,
      }).select('-password')
      if (user) await this.redis.set(`userId:${id}`, JSON.stringify(user), 3600)

      return user
    } catch (e) {
      throw new CustomError(constant.FAILED_FIND_USER)
    }
  }

  async updateUserById(data, id) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-password')
      if (!user) throw new CustomError(constant.FAILED_UPDATE_USER)

      await this.redis.del(`userId:${id}`)
      await this.redis.del(`userEmail:${data.email}`)

      return user
    } catch (e) {
      throw new CustomError(constant.FAILED_UPDATE_USER)
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.userModel.findOne({
        _id: id,
        deletedAt: null,
      })
      if (!user) throw new CustomError(constant.USER_NOT_FOUND, 404)

        user.deletedAt = new Date()
        await user.save()
    
        await this.redis.del(`userId:${id}`)
        await this.redis.del(`userEmail:${user.emailAddress}`)
    } catch (e) {
      throw new CustomError(constant.FAILED_DELETE_USER)
    }
  }
}

module.exports = UserRepository
