const {Router} = require('express')
const QuizController = require('../controllers/QuizController')
const Auth = require('../middleware/auth')

const router = new Router


router.get(`/`, 
  Auth.verify,
  QuizController.getQuizQuestions
)
  
  
router.post('/', 
  Auth.verify,
  QuizController.add
)
  
router.delete('/:id',
Auth.verify,
QuizController.delete
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



module.exports = router