const Quiz = require('../models/Quiz')

module.exports = {

  add: async (req,res) => {
    const {imgFile,name} = req.body
    try{
      const quiz = await Quiz.create({imgFile,name, userId:req.user.id})
      console.log(quiz);
      res.json({message: `Success! Quiz ${quiz.name} created`})
    }
    catch(error){
      res.json({message: error})
    }
  }


}