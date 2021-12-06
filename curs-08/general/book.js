module.exports = (sequelize, Sequelize) => {
  return sequelize.define('book', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
  })
}
