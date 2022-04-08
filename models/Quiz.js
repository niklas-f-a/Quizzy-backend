const db = require('../database/connection')
const {DataTypes, Model} = require('sequelize')

class Quiz extends Model{}

Quiz.init({
  img_file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize: db,
  modelName: 'Quiz',
  timestamps: false
})

module.exports = Quiz