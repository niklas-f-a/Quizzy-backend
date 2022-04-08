const Quiz = require('../models/Quiz')

module.exports = {

  add: async (req,res) => {
    const {imgFile,name} = req.body
    try{
      const quiz = await Quiz.create({imgFile,name, userId:req.user.id})
      res.json({message: `Success! Quiz ${quiz.name} created. Add some quetions.`})
    }
    catch(error){
      res.json({message: error})
    }
  },

  addQuestion: async(req,res) => {
    console.log(req.params);
    console.log(req.body);
  }


}