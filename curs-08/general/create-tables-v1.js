const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})

const Author = sequelize.define('author', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

sequelize.sync().then(() => {
  console.warn('tables created')
})
