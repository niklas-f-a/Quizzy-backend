const {Router} = require('express')
const QuizController = require('../controllers/QuizController')
const Auth = require('../middleware/auth')

const router = new Router


router.get(`/`, 
  Auth.verify,
  QuizController.getQuiz
)
  
  
router.post('/', 
  Auth.verify,
  QuizController.add
)
  
router.put(`/Questions`, 
  Auth.verify,
  QuizController.addQuestion
)






module.exports = router