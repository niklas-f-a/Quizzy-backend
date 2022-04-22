const Quiz = require('../models/Quiz')
const Question = require('../models/Question')
const User = require('../models/User')
const TakenQuiz = require('../models/TakenQuiz')
const Category = require('../models/Category')
const sequelize = require('sequelize')
const {QuizError, UserError} = require('../error')


module.exports = {

  getAllByCategory: async (req, res, next) => {
    let pageSize
    const page = +req.query.page || 1
    if(req.query.pageSize > 10){
      pageSize = 10
    }else{
      pageSize = +req.query.pageSize || 10
    }
    try{
      const quizzes = await Quiz.findAll({
        where: {CategoryId: req.params.categoryId},
        limit: pageSize,
        offset: (page-1)*pageSize,
        include: Category
      })
      if(!quizzes.length){
        throw new QuizError(404, 'Could not find any quizzes with that category id')
      }
      const categoryCount = await Quiz.findOne({
        where: {CategoryId: req.params.categoryId},
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('CategoryId')), 'counts']
        ]
      })
      res.json({categoryCount, data: quizzes})
    }catch(error){
      next(error)
    }
  },

  quizTaken: async (req, res, next) => {
    const {id} = req.params
    try{
      const quizTaken = await TakenQuiz.findOne({where: {UserId: req.user.id, QuizId: id}})
      if(quizTaken){
        throw new QuizError(401, 'User has already taken quiz')
      }
      res.status(200).send({message: 'ok'})
    }catch(error){
      next(error)
    }
  },

  add: async (req,res) => {
    try{
      const {imgFile,name, CategoryId} = req.body
      const category = await Category.findByPk(CategoryId)
      const quiz = await category.createQuiz({imgFile,name, userId:req.user.id})
      res.status(201).json({message: `Success! Quiz ${quiz.name} created. Add some quetions.`,
      data: quiz})
    }
    catch(error){
      res.status(409).json({error: "Test with that name already exists"})
    }
  },

  delete: async (req,res, next) => {
    try{
      const quiz = await Quiz.findByPk(req.params.id)
      if(!quiz){
        throw new QuizError(404, 'Quiz not found')
      }
      if(quiz.userId !== req.user.id){
        throw new QuizError(401, 'Not your quiz')
      }
      await quiz.destroy()
      res.json({message: 'Quiz destroyed'})
    }catch(error){
      next(error)
    }
  },

  result: async (req,res, next) => {
    const quiz = await Quiz.findByPk(req.params.id)
    const user = await User.findByPk(req.user.id)
    try{
      const takenQuiz = await user.addQuiz(quiz, {through: {score: req.body.score}})
      if(!takenQuiz.length){
        throw new QuizError(500, 'Unable to store result')
      }
      res.json({message: 'Added to takenquizzes'})
    }catch(error){
      next(error)
    }
  },

  getUsersQuiz: async (req, res, next) => {
    const page = req.query.page || 1
    const id = req.params.id
    try{
      const userQuizCount = await Quiz.findOne({
        where: {
          UserId: id
        },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('UserId')), 'counts']
        ]
      })
      const userQuizzes = await Quiz.findAll({
        where: {
          UserId: id,
        },
        limit: 10,
        offset: (page-1)*10,
        include: {
          model: Category,
          attributes: ['name']
        }
      })
      if(!userQuizzes.length){
        throw new UserError(404, 'Could not find any quizzes from this user')
      }
      res.json({userQuizCount, data: userQuizzes})
    }catch(error){
      next(error)
    }
  },

  getQuiz: async (req,res) => {
    const {id} = req.params
    const quiz = await Question.findAll({where: {QuizId: id}})
    res.json({data: quiz})
  },

  addQuestion: async(req,res) => {
    await Question.bulkCreate(req.body)
    res.json({message: 'Added question to quiz'})
  },

  updateQuestion: async (req,res, next) => {
    try{
      const question = await Question.findByPk(req.params.questionId)
      if(!question.length){
        throw new QuizError(404, 'Quiz has no questions')
      }
      await question.update(req.body)
      res.status(200).send({message: 'Updated question succesful'})
    }
    catch(error){
      next(error)
    }
  },

  deleteQuestion: async (req,res, next) => {
    try{
      const {quizId, questionId} = req.params
      const quiz = await Quiz.findByPk(quizId)
      if(quiz.userId !== req.user.id){
        throw new QuizError(401, 'Not your quiz')
      }
      const question = await Question.findByPk(questionId)
      await question.destroy()
      res.json({message: 'Destroyed'})
    }
    catch(error){
      next(error)
    }
  }

}