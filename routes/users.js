const {Router} = require('express')
const UserController = require('../controllers/UserController')
const Auth = require('../middleware/auth')

const router = new Router()


router.get('/me', 
  Auth.verify,
  UserController.me
)

router.post('/register',
  UserController.register
)

router.post('/login',
  UserController.validate
)

router.patch('/me',
  Auth.verify,
  UserController.update
)

router.delete('/me',
  Auth.verify,
  UserController.delete
)



module.exports = router