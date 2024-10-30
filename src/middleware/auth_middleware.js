const { verify } = require('jsonwebtoken')
const { CustomError } = require('../util/errorHandler')
const constant = require('../util/constant')

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header) throw new CustomError(constant.INVALID_TOKEN, 401)

    const token = header.split(' ')[1]
    if (!token) throw new CustomError(constant.UNAUTHORIZED, 401)
    
    const decoded = verify(token, process.env.TOKEN_KEY)
    req.auth = decoded
    next()
  } catch (e) {
    next(new CustomError(constant.UNAUTHORIZED, 401))
  }
}

