const db = require('../database/connection')
const {DataTypes, Model} = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class User extends Model{

  static async validate (email,password) {
    const user = await User.findOne({where: {email:email}})
    if(!user){
      throw new Error('No such User')
    }
    const passwordMatch = bcrypt.compareSync(password, user.hashPassword)
    if(passwordMatch){
      const payload = {
        id: user.id,
        email: user.email
      }
      return jwt.sign(payload, process.env.JWTSECRET, {expiresIn: '1d'})
    }
    else{
      throw new Error('Invalid credentials')
    }
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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

User.beforeCreate((user, options) => {
  user.hashPassword = bcrypt.hashSync(user.hashPassword, 10)
})

User.beforeUpdate((user, options) => {
  user.hashPassword = bcrypt.hashSync(user.hashPassword, 10)
})




module.exports = User