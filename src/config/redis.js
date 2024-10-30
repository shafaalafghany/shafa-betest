const redis = require('redis')

let redisClient
const redisType = process.env.REDIS_TYPE || 'uri'

if (redisType === 'uri') {
  redisClient = redis.createClient({ url: process.env.REDIS_URL })
} else {
  redisClient = redis.createClient({ socket: { host: process.env.REDIS_URL } })
}

redisClient.on('error', (error) => {
  console.error('unable connect to redis:', error);
})

redisClient.connect()

module.exports = redisClient
