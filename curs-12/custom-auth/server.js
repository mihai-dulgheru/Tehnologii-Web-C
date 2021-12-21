const express = require('express')
const crypto = require('crypto')
const moment = require('moment')

const TOKEN_EXPIRY = 60

const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'auth.db'
})

const User = sequelize.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  expiry: Sequelize.DATE
})

const app = express()

app.use(express.json())

const authRouter = express.Router()
const apiRouter = express.Router()
const adminRouter = express.Router()

app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use('/admin', adminRouter)

apiRouter.use(async (req, res, next) => {
  if (req.headers.auth) {
    const user = await User.findOne({
      where: {
        token: req.headers.auth
      }
    })
    if (user) {
      if (moment().diff(user.expiry, 'seconds') < 0) {
        next()
      } else {
        res.status(401).json({ message: 'token has expired' })
      }
    } else {
      res.status(401).json({ message: 'no token' })
    }
  } else {
    res.status(401).json({ message: 'no auth header' })
  }
})

adminRouter.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

adminRouter.post('/users', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const credentials = req.body
    const user = await User.findOne({
      where: {
        username: credentials.username,
        password: credentials.password
      }
    })
    if (user) {
      const token = crypto.randomBytes(16).toString('hex')
      user.token = token
      user.expiry = moment().add(TOKEN_EXPIRY, 'seconds')
      await user.save()
      res.status(200).json({ message: 'login successful', token })
    } else {
      res.status(401).json({ message: 'unauthorized' })
    }
  } catch (err) {
    next(err)
  }
})

apiRouter.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)
