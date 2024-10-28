const redis = require('redis')

let redisClient
const redisType = process.env.REDIS_TYPE || 'uri'

if (redisType === 'uri') {
  redisClient = redis.createClient({ url: process.env.REDIS_URL })
} else {
  redisClient = redis.createClient({ socket: { host: 'localhost' } })
}

redisClient.on('error', (error) => {
  console.error('Redis connection error:', error);
})

redisClient.connect()

module.exports = redisClient
