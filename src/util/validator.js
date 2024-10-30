const lodash = require('lodash')
const { CustomError } = require('../util/errorHandler')

const validator = (obj, params, msgOnError = null) => {
  for (let val of params) {
    if (val.includes("*num")) {
      val = val.replace("*num", "")
      obj[val] = Number(obj[val]).toString()
    }

    if (!lodash.get(obj, val)) {
      if (msgOnError) {
        throw new Error(msgOnError(obj, val))
      } else {
        throw new CustomError(`empty field(s) ["${val}"]`, 400)
      }
    }
  }
}

module.exports = validator
