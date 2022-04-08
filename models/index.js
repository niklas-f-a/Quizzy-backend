const User = require('./User')
const Question = require('./Question')
const Quiz = require('./Quiz')
const TakenQuiz = require('./TakenQuiz')


module.exports = function setup(){
  User.belongsToMany(Quiz, {through: TakenQuiz})
  Quiz.belongsToMany(User, {through: TakenQuiz})
  // Quiz.belongsTo(User)
  // User.hasMany(Quiz)
  
  Quiz.hasMany(Question)
  Question.belongsTo(Quiz)
}
