const {Router} = require('express')
const Auth = require('../middleware/auth')
const ImageController = require('../controllers/ImageController')

const router = new Router()

router.post('/upload',
  Auth.verify,
  ImageController.upload
)






module.exports = router