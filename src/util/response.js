module.exports = {
  ERROR: (res, code, message) => {
    res.status(code).json({ message })
  },
  SUCCESS: (res, code, message, data, count = null) => {
    if ((message === '' || message == null) && (count === 0 || count === null)) {
      return res.status(code).json({ data })
    } else if (message === '' || message == null) {
      return res.status(code).json({ count, data })
    } else if (data === '' || data == null) {
      return res.status(code).json({ message })
    } else if (count === 0) {
      return res.status(code).json({ message, data })
    } else {
      return res.status(code).json({ message, count, data })
    }
  },
}
