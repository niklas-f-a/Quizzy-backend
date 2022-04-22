const User = require('../models/User')
const {UserError} = require('../error')

module.exports = {

  delete: async (req,res, next) => {
    try{
      const user = await User.findByPk(req.user.id)
      if(!user.length){
        throw new UserError(404, 'No such user')
      }
      await user.destroy()
      res.json({message: 'Destroyed'})
    }
    catch(error){
      next(error)
    }
  },

  me: async (req,res) => {
    const {id, email} = req.user
    res.json({
      data: {
        id,
        email
      }
    })
  },

  update: async (req,res, next) => {
    try{
      const user = await User.findByPk(req.user.id)
      if(!user.length){
        throw new UserError(404, 'No such user')
      }
      await user.update({email:req.body.email, hashPassword:req.body.password})
      res.json({message: 'Updated'})
    }
    catch(error){
      next(error)
    }
  },

  register: async (req,res) => {
    const {email,password} = req.body
    try{
      const user = await User.create({email,hashPassword:password})
      const token = await User.validate(email,password)
      res.status(201).json({
        message: 'User registered',
        token,
        user: {
          id: user.id,
          email: user.email
        }
      })
    }
    catch(error){
      res.status(409).json({error: error.ValidationErrorItem})
    }
  },

  validate: async (req,res, next) => {
    const {email,password} = req.body
    try{
      const token = await User.validate(email,password)
      res.json({token})

    }catch(error){
      next(error)
    }
  }


}