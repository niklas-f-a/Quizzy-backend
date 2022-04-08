const fs = require('fs')
const path = require('path')
require('dotenv').config()

if(fs.existsSync(path.join('database',process.env.DB))){
  fs.unlinkSync(path.join('database',process.env.DB))
}

const db = require('./connection')

require('../models')()

db.sync({alter: true})

console.log('Setup done');