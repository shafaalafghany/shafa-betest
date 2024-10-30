require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const V1Routes = require('./src/routes/v1')
const connectDB = require('./src/config/database')
const redis = require('./src/config/redis')
const { errorHandler } = require('./src/util/errorHandler')

const app = express()
const redisClient = redis

connectDB()

app.use(express.json())

app.get('/health', async (req, res) => {
  res.status(200).json({status: 'OK'})
})

app.use('/api/v1', V1Routes)

app.use(errorHandler)

const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log(`server is running on port ${port}`))

const gracefulShutdown = (signal) => {
  const timeout = setTimeout(() => {
    console.warn('shutdown timeout reached, forcing shutdown')
  }, 10000)

  server.close(async (err) => {
    if (err) {
      console.error('error shutting down server: ', err)
      clearTimeout(timeout)
      process.exit(1)
    }

    try {
      await mongoose.connection.close()
    } catch (e) {
      console.error('error closing mongodb connection: ', e)
    }

    try {
      await redisClient.quit()
    } catch (e) {
      console.error('error closing redis connection: ', e)
    }

    process.exit(0)
  })
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
