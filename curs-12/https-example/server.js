require('dotenv').config({ path: './server.env' })

const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')

const privatekey = fs.readFileSync('certs/key.pem', 'utf8')
const certificate = fs.readFileSync('certs/cert.pem', 'utf8')

const credentials = {
  key: privatekey,
  cert: certificate,
  passphrase: process.env.SSL_PASSPHRASE
}

const app = express()
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

app.get('*', (req, res, next) => {
  if (req.protocol !== 'https') {
    res.redirect(`https://${req.headers.host.split(':')[0]}:8443${req.url}`)
  } else {
    next()
  }
})

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

httpServer.listen(8080)
httpsServer.listen(8443)
