


module.exports = {

  register: (req,res,next) => {
    const message = []
    const {email, password} = req.body
    if(!email){
      message.push("Missing email")
    }
    if(!password){
      message.push("Missing password")
    }
    if(message.length){
      res.status(400).json({message})
    }else{
      next()
    }
  }


}