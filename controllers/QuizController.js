const Quiz = require('../models/Quiz')
const Question = require('../models/Question')

module.exports = {

  add: async (req,res) => {
    const {imgFile,name} = req.body
    try{
      const quiz = await Quiz.create({imgFile,name, userId:req.user.id})
      res.json({message: `Success! Quiz ${quiz.name} created. Add some quetions.`})
    }
    catch(error){
      res.json({message: error})
    }
  },

  getQuiz: async (req,res) => {
    const {id} = req.body
    const quiz = await Question.findAll({where: {QuizId: id}})
    res.json({data: quiz})
  },

  addQuestion: async(req,res) => {
    const {quizId, question} = req.body
    const quiz = await Quiz.findByPk(quizId)
    await quiz.createQuestion({...question})
    res.json({message: 'Added question to quiz'})
  }


}