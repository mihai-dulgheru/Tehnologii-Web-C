const Sequelize = require('sequelize')
const Op = Sequelize.Op

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db',
  define: {
    timestamps: false
  }
})

const Person = sequelize.define('person', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  salary: Sequelize.INTEGER
})

const main = async () => {
  try {
    await sequelize.sync({ force: true })
    await Person.bulkCreate([
      {
        name: 'john',
        age: 24,
        salary: 1000
      },
      {
        name: 'jim',
        age: 30,
        salary: 2000
      },
      {
        name: 'jane',
        age: 27,
        salary: 3000
      }
    ])
    let people = await Person.findAll({ where: { name: 'john' }, attributes: ['name', 'salary'], raw: true })

    people = await Person.findAll({
      where: {
        salary: {
          [Op.gt]: 1000,
          [Op.lt]: 3000
        }
      },
      raw: true
    })

    people = await Person.findAll({
      where: {
        [Op.or]: [
          {
            salary: {
              [Op.gt]: 1000,
              [Op.lt]: 3000
            }
          },
          {
            age: {
              [Op.between]: [20, 25]
            }
          }
          // {
          //   name: {
          //     [Op.regexp]: '.+a.+'
          //   }
          // }
        ]
      },
      raw: true
    })

    console.warn(people)
  } catch (err) {
    console.warn(err)
  }
}

main()
