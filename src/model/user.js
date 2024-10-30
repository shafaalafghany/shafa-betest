const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    userName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    identityNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
