const fs = require('fs')
const path = require('path')
const {ImageError} = require('../error')



module.exports = {

  upload: (req,res, next) => {
    if(!req.files.imgFile.mimetype.startsWith('image/')){
      throw new ImageError(400, 'File must be image')
    }
    if(fs.existsSync(path.join('public','images',req.files.imgFile.name))){
      throw new ImageError(500, 'File already exist')
    }else{
      fs.copyFileSync(req.files.imgFile.tempFilePath, path.join('public','images', req.files.imgFile.name))
      res.json({message: 'Image uploaded'})
    }
  }

}