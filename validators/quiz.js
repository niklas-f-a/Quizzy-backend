


module.exports = {
  addQuiz: (req, res, next) => {
    const message = []
    const {imgFile,name, CategoryId} = req.body
    if(!imgFile){
      message.push("Missing image")
    }
    if(!name){
      message.push("Quiz needs a title")
    }
    if(!CategoryId){
      message.push("Missing category id")
    }
    if(message.length){
      res.status(400).json({error: message})
    }else{
      next()
    }
  },

  quizResult: (req,res,next) => {
    if(!req.body.score){
      res.status(400).json({error: "Missing score"})
    }else{
      next()
    }
  },

  question: (req, res, next) => {
    const questions = req.body
    const message = []
    for(let i = 0; i < questions.length; i++){
      if(!questions[i].question){
        message.push(`Missing a question on question ${i+1}`)
      }
      if(!questions[i].rightAnswer){
        message.push(`Missing a rightAnswer on question ${i+1}`)
      }
      if(!questions[i].answer2){
        message.push(`Missing a wrong answer on question ${i+1}`)
      }
      if(!questions[i].answer3){
        message.push(`Missing a wrong answer on question ${i+1}`)
      }
      if(!questions[i].answer4){
        message.push(`Missing a wrong answer on question ${i+1}`)
      }
      if(!questions[i].QuizId){
        message.push(`Missing a quiz id on question ${i+1}`)
      }
    }
    if(message.length){
      res.status(400).json({error: message})
    }else{
      next()
    }
  },



}