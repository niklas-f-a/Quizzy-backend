class HTTPException extends Error{
  constructor(status, message){
    super(message)
    this.status = status
  }
}

class UserError extends HTTPException{
  constructor(status, message){
    super()
    this.status = status
    this.message = message
  }
}

class ImageError extends HTTPException{
  constructor(status, message){
    super()
    this.status = status
    this.message = message
  }
}

class QuizError extends HTTPException{
  constructor(status, message){
    super()
    this.status = status
    this.message = message
  }
}


module.exports = {
  HTTPException,
  UserError,
  ImageError,
  QuizError
}