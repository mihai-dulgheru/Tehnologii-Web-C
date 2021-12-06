const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})

const Book = sequelize.define('book', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT
})

const Chapter = sequelize.define('chapter', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT
})

Book.hasMany(Chapter)

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())

app.get('/sync', async (req, res) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/books', async (res, res) => {
  // TODO
})

app.listen(8080)
