require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())

app.get('/health', async (req, res) => {
  res.status(200).json({status: 'OK'})
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server is running on port ${port}`))
