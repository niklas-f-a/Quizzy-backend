const User = require('../models/User')


module.exports = {

  delete: async (req,res) => {
    console.log(req.user);
    try{
      const user = await User.findByPk(req.user.id)
      await user.destroy()
      res.json({message: 'Destroyed'})
    }
    catch(error){
      res.json({message: error})
    }
  },

  me: async (req,res) => {
    const {id, email} = req.user
    res.json({
      id,
      email
    })
  },
  
  update: async (req,res) => {
    try{
      const user = await User.findByPk(req.user.id)
      await user.update({email:req.body.email, hashPassword:req.body.password})
      res.json({message: 'Updated'})
    }
    catch(error){
      res.json({error})
    }
  },

  register: async (req,res) => {
    const {email,password} = req.body
    try{
      const user = await User.create({email,hashPassword:password})
      const token = await User.validate(email,password)
      res.json({
        message: 'User registered',
        token,
        user: {
          id: user.id,
          email: user.email
        }
      })
    }
    catch(error){
      res.json({error})
    }
  },

  validate: async (req,res) => {
    const {email,password} = req.body
    try{
      const token = await User.validate(email,password)
      res.json({token})
    }
    catch(error){
      res.json({error})
    }
  }

  

}