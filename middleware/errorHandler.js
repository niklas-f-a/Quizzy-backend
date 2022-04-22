const {HTTPException} = require('../error')

module.exports = (error, req, res, next) => {
  if(error instanceof HTTPException){
    console.log(req.method, req.path, error.status, error.message);
    res.status(error.status).json({error: error.message})
  }
}