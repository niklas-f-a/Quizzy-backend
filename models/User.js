const db = require('../database/connection')
const {DataTypes, Model} = require('sequelize')

class User extends Model{}

User.init({
  email: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hashPassword: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize: db,
  modelName: 'User',
  timestamps: false
})

module.exports = User