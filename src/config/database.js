const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('database connected')
  } catch (e) {
    console.error('unable connect to database: ', e)
    process.exit(1)
  }
}

module.exports = connectDB
