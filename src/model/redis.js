const redisClient = require('../config/redis')

class RedisModel {
  async get(key) {
    return await redisClient.get(key)
  }

  async set(key, value, ttl = 3600) {
    await redisClient.set(key, value, { EX: ttl })
  }

  async del(key) {
    await redisClient.del(key)
  }
}

module.exports = new RedisModel()
