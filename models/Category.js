const db = require('../database/connection')
const {DataTypes, Model} = require('sequelize')

class Category extends Model{}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Category',
  timestamps: false
})

module.exports = Category