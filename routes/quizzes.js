const {Router} = require('express')
const QuizController = require('../controllers/QuizController')
const CategoryController = require('../controllers/CategoryController')
const Auth = require('../middleware/auth')

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
  QuizController.add
)
  
router.delete('/:id',
Auth.verify,
QuizController.delete
)


router.post('/result/:id', 
  Auth.verify,
  QuizController.result
)

router.delete('/:quizId/:questionId',
  Auth.verify,
  QuizController.deleteQuestion
)

router.put(`/:quizId/`, 
  Auth.verify,
  QuizController.addQuestion
)

router.patch('/:quizId/:questionId',
  Auth.verify,
  QuizController.updateQuestion
)

router.get('/Taken/:id', 
  Auth.verify,
  QuizController.quizTaken
)



module.exports = router