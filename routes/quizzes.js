const {Router} = require('express')
const QuizController = require('../controllers/QuizController')
const Auth = require('../middleware/auth')

const router = new Router


router.post('/', 
  Auth.verify,
  QuizController.add
)

router.post(`/:listName/Questions`, 
  QuizController.addQuestion
)






module.exports = router