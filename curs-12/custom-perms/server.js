const express = require('express')
const crypto = require('crypto')
const moment = require('moment')

const TOKEN_EXPIRY = 600

const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'auth.db'
})

const User = sequelize.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  expiry: Sequelize.DATE,
  userType: Sequelize.STRING
})

const Resource = sequelize.define('resource', {
  content: Sequelize.STRING
})

const Permission = sequelize.define('permission', {
  permType: Sequelize.ENUM('read')
})

User.hasMany(Permission)
Resource.hasMany(Permission)

const app = express()

app.use(express.json())

const authRouter = express.Router()
const apiRouter = express.Router()
const adminRouter = express.Router()

app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use('/admin', adminRouter)

const permMiddleware = async (req, res, next) => {
  const user = res.locals.user
  try {
    const perm = await Permission.findOne({
      where: {
        userId: user.id,
        resourceId: req.params.rid
      }
    })
    if (perm) {
      next()
    } else {
      res.status(401).json({ message: `resource ${req.params.rid} does not belong to you` })
    }
  } catch (err) {
    next(err)
  }
}

apiRouter.use(async (req, res, next) => {
  if (req.headers.auth) {
    const user = await User.findOne({
      where: {
        token: req.headers.auth
      }
    })
    if (user) {
      if (moment().diff(user.expiry, 'seconds') < 0) {
        res.locals.user = user
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

apiRouter.use(async (req, res, next) => {
  const user = res.locals.user
  if (user.userType === 'special') {
    next()
  } else {
    res.status(401).json({ message: 'only special users can acces this' })
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

apiRouter.post('/users/:uid/resources', async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body)
    const user = await User.findByPk(req.params.uid)
    const permission = new Permission()
    permission.permType = 'read'
    permission.userId = user.id
    permission.resourceId = resource.id
    await permission.save()
    res.status(201).json({ message: `resource ${resource.id} created for user ${user.id}` })
  } catch (err) {
    next(err)
  }
})

apiRouter.get('/users/:uid/resources/:rid', permMiddleware, async (req, res, next) => {
  try {
    const resource = await Resource.findByPk(req.params.rid)
    if (resource) {
      res.status(200).json(resource)
    } else {
      res.status(404).json({ message: `resource ${req.params.rid} not found` })
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
