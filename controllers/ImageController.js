const fs = require('fs')
const path = require('path')



module.exports = {

  upload: (req,res) => {
    if(!req.files.imgFile.mimetype.startsWith('image/')){
      res.status(400).json({error: 'File must be an image'})
    }
    if(fs.existsSync(path.join('public','images',req.files.imgFile.name))){
      res.status(400).json({message: 'Image already exist'})
    }
    fs.copyFileSync(req.files.imgFile.tempFilePath, path.join('public','images', req.files.imgFile.name))
    res.json({message: 'Image uploaded'})
    
  }

}