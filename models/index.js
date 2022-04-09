const User = require('./User')
const Question = require('./Question')
const Quiz = require('./Quiz')
const TakenQuiz = require('./TakenQuiz')


module.exports = function setup(){
  User.belongsToMany(Quiz, {through: TakenQuiz, onDelete: 'CASCADE'})
  Quiz.belongsToMany(User, {through: TakenQuiz, onDelete: 'CASCADE'})
  // Quiz.belongsTo(User)
  // User.hasMany(Quiz)
  
  Quiz.hasMany(Question, {onDelete: 'CASCADE'})
  Question.belongsTo(Quiz)
}
