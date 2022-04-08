const db = require('../database/connection')
const {DataTypes, Model} = require('sequelize')

class TakenQuiz extends Model{}

TakenQuiz.init({
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize: db,
  modelName: 'TakenQuiz',
  timestamps: false
})

module.exports = TakenQuiz
