const User = require('../models/User')
const Question = require('../models/Question')
const Quiz = require('../models/Quiz')
const TakenQuiz = require('../models/TakenQuiz')
require('../models')()

async function seed(){
  await User.destroy({where: {}, truncate: true})
  await Question.destroy({where: {}, truncate: true})
  await Quiz.destroy({where: {}, truncate: true})
  await TakenQuiz.destroy({where: {}, truncate: true})
  
  const user1 = await User.create({email: 'bingo@bongo.com', hashPassword: 'sdjvbkjsbdvljsebdn'})
  const quiz = await Quiz.create({img_file: 'bingo.png', userId: 1})
  await quiz.createQuestion({
    question:'How many potatoes is there in Norway',
    rightAnswer: 'Blue',
    answer2: 'Green',  
    answer3: 'Horse',  
    answer4: 'Water'  
  })
  await quiz.createQuestion({
    question:'Is there Coffee in this',
    rightAnswer: 'Yes',
    answer2: 'No',  
    answer3: 'Kabbanos',  
    answer4: 'Green'  
  })
  await quiz.createQuestion({
    question:'How do you spell Asparrigus',
    rightAnswer: 'Dont know',
    answer2: 'Like left',  
    answer3: '2 stone',  
    answer4: 'high'  
  })
  user1.addQuiz(quiz, {through: {score: 100}})
  
  
  console.log('Seeding done');
}
seed()