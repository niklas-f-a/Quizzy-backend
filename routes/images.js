const {Router} = require('express')
const Auth = require('../middleware/auth')
const ImageController = require('../controllers/ImageController')
const fileUpload = require('express-fileupload')


const router = new Router()

router.post('/upload',
  Auth.verify,
  fileUpload({
    useTempFiles: true, 
  }),
  ImageController.upload
)






module.exports = router