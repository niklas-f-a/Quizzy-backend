const {Router} = require('express')
const QuizController = require('../controllers/QuizController')
const Auth = require('../middleware/auth')

const router = new Router


router.post('/', 
  Auth.verify,
  QuizController.add
)






module.exports = router