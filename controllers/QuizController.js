const Quiz = require('../models/Quiz')
const Question = require('../models/Question')
const User = require('../models/User')
const TakenQuiz = require('../models/TakenQuiz')
const { query } = require('../database/connection')

const pageSize = 10



module.exports = {

  getAll: async (req, res) => {
    const page = +query.page || 1
    console.log(page);
    const quizzes = await Quiz.findAll({
      where: {CategoryId: req.params.categoryId},
      limit: pageSize,
      offset: (page-1)*10
    })
    res.json({data: quizzes})
  
  },
  
  quizTaken: async (req, res) => {
    const {id} = req.params
    const quizzes = await TakenQuiz.findAll({where: req.user.id})
    const quizTaken = quizzes.some(quiz => quiz.QuizId == id)
    if(quizTaken){
      res.json({data: {quizTaken: true}})
    }
    else{
      res.json({data: {quizTaken: false}})
    }
  },

  add: async (req,res) => {
    const {imgFile,name} = req.body
    try{
      const quiz = await Quiz.create({imgFile,name, userId:req.user.id})
      res.json({message: `Success! Quiz ${quiz.name} created. Add some quetions.`,
      data: quiz})
    }
    catch(error){
      res.json({message: error})
    }
  },

  delete: async (req,res) => {
    const quiz = await Quiz.findByPk(req.params.id)
    if(!quiz){
      res.json({message: 'Quiz not found'})
    }
    if(quiz.userId !== req.user.id){
      res.json({message: 'Quiz has not been deleted'})
    }
    else{
      await quiz.destroy()
      res.json({message: 'Quiz destroyed'})
    }
  },

  result: async (req,res) => {
    const quiz = await Quiz.findByPk(req.params.id)
    const user = await User.findByPk(req.user.id)
    try{
      await user.addQuiz(quiz, {through: {score: req.body.score}})
      res.json({message: 'Added to takenquizzes'})
    }
    catch(error){
      res.json({error})
    }
  },

  getQuiz: async (req,res) => {
    const {id} = req.params
    const quiz = await Question.findAll({where: {QuizId: id}})
    res.json({data: quiz})
  },
  
  addQuestion: async(req,res) => {
    const quiz = await Quiz.findByPk(req.params.quizId)
    if(quiz.userId !== req.user.id){
      res.json({message: 'Not your quiz'})
    }
    else{
      await quiz.createQuestion(req.body)
      res.json({message: 'Added question to quiz'})
    }
  },

  updateQuestion: async (req,res) => {
    const {quizId, questionId} = req.params
    const quiz = await Quiz.findByPk(quizId)
    if(quiz.userId !== req.user.id){
      res.json({message: 'Not Your Quiz'})
    }
    else{
      try{
        const question = await Question.findByPk(questionId)
        await question.update(req.body)
        res.json({data: question})
      }
      catch(error){
        res.json({error})
      }
    }
  },

  deleteQuestion: async (req,res) => {
    const {quizId, questionId} = req.params
    const quiz = await Quiz.findByPk(quizId)
    if(quiz.userId !== req.user.id){
      res.json({message: 'Not Your Quiz'})
    }
    else{
      try{
        const question = await Question.findByPk(questionId)
        await question.destroy()
        res.json({message: 'Destroyed'})
      }
      catch(error){
        res.json({error})
      }
    }
  }
  
  
}