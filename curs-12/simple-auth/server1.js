const express = require('express')

const app = express()

app.use((req, res, next) => {
  if (req.headers.authorization) {
    const encoded = req.headers.authorization.split(' ')[1]
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
    const [username, password] = decoded.split(':')
    if (username === 'admin' && password === 'supersecret') {
      next()
    } else {
      res.status(401).send('Unauthorized')
    }
  } else {
    res.status(401).send('Unauthorized')
  }
})

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

app.listen(8080)
