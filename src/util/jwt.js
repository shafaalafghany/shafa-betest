const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const payload = { id: user._id }

  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_AGE })

  return token
}

module.exports = { generateToken }
