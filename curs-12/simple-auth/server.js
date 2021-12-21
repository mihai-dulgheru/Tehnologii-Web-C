const express = require('express')
const basicAuth = require('express-basic-auth')

const app = express()

app.use(
  basicAuth({
    users: {
      admin: 'supersecret'
    }
  })
)

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

app.listen(8080)
