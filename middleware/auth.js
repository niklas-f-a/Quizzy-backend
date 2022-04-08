const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  async verify(req,res,next){
    try{
      const token = req.header('Authorization').replace('Bearer ', '')
      const user = jwt.verify(token, process.env.JWTSECRET)
      req.user = user
      next()
    }
    catch(error){
      res.status(401).send({error: 'Unauthorized'})  
    }
  }





}