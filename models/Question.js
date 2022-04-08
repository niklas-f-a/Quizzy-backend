const db = require('../database/connection')
const {DataTypes, Model} = require('sequelize')

class Question extends Model{}

Question.init({
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rightAnswer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer4: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  sequelize: db,
  modelName: 'Question',
  timestamps: false
})

module.exports = Question