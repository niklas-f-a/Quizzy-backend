const {Router} = require('express')
const QuizController = require('../controllers/QuizController')
const CategoryController = require('../controllers/CategoryController')
const Auth = require('../middleware/auth')
const Validate = require('../validators/quiz')

const router = new Router()

router.get('/categories',
  CategoryController.getCategories
)

router.get(`/:id`,
  Auth.verify,
  QuizController.getQuiz
)

router.get('/categories/:categoryId',
  Auth.verify,
  QuizController.getAllByCategory
)

router.get('/users/:id',
  Auth.verify,
  QuizController.getUsersQuiz
)


router.post('/',
  Auth.verify,
  Validate.addQuiz,
  QuizController.add
)

router.post('/result/:id',
  Auth.verify,
  Validate.quizResult,
  QuizController.result
)

router.delete('/:quizId/:questionId',
  Auth.verify,
  QuizController.deleteQuestion
)

router.put(`/`,
  Auth.verify,
  Validate.question,
  QuizController.addQuestion
)

router.patch('/Question/:questionId',
  Auth.verify,
  Validate.question,
  QuizController.updateQuestion
)

router.get('/Taken/:id',
  Auth.verify,
  QuizController.quizTaken
)

router.delete('/:id',
Auth.verify,
QuizController.delete
)


module.exports = router