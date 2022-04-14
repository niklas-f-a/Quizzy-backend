const User = require('../models/User')
const Question = require('../models/Question')
const Quiz = require('../models/Quiz')
const TakenQuiz = require('../models/TakenQuiz')
const Category = require('../models/Category')
require('../models')()
const CATEGORIES = [{name: 'music'}, {name: 'nature'}, {name: 'movie'}, {name: 'mix'}]

async function seed(){
  await User.destroy({where: {}, truncate: true})
  await Question.destroy({where: {}, truncate: true})
  await Quiz.destroy({where: {}, truncate: true})
  await TakenQuiz.destroy({where: {}, truncate: true})


  await Category.bulkCreate(CATEGORIES)
  const user1 = await User.create({email: 'bingo@bongo.com', hashPassword: 'ballong'})
  const quiz = await Quiz.create({imgFile: 'niko-photos-tGTVxeOr_Rs-unsplash.webp', userId: 1, name: 'bulle', CategoryId: 1})
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
  await Quiz.create({imgFile: 'niko-photos-tGTVxeOr_Rs-unsplash.webp', userId: 1, name: 'bille', CategoryId: 1})
  await Quiz.create({imgFile: 'niko-photos-tGTVxeOr_Rs-unsplash.webp', userId: 1, name: 'bxlxle', CategoryId: 1})
  await Quiz.create({imgFile: 'niko-photos-tGTVxeOr_Rs-unsplash.webp', userId: 2, name: 'lov', CategoryId: 2})
  await Quiz.create({imgFile: 'niko-photos-tGTVxeOr_Rs-unsplash.webp', userId: 2, name: 'qwqw', CategoryId: 3})
  await Quiz.create({imgFile: 'niko-photos-tGTVxeOr_Rs-unsplash.webp', userId: 2, name: 'qwwdsqw', CategoryId: 4})
  
  
  
  console.log('Seeding done');
}
seed()