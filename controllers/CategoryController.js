const Category = require('../models/Category')

module.exports = {
  getCategories: async (req, res) => {
    const categories = await Category.findAll()
    res.json(categories)
  }
}