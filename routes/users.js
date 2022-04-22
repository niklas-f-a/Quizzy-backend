const {Router} = require('express')
const UserController = require('../controllers/UserController')
const Auth = require('../middleware/auth')
const Validator = require('../validators/user')

const router = new Router()


router.get('/me',
  Auth.verify,
  UserController.me
)

router.post('/register',
  Validator.register,
  UserController.register
)

router.post('/login',
  Validator.register,
  UserController.validate
)

router.patch('/me',
  Auth.verify,
  Validator.register,
  UserController.update
)

router.delete('/me',
  Auth.verify,
  UserController.delete
)



module.exports = router