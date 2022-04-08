const express = require('express')
require('dotenv').config()
const routes = require('./routes')
const logger = require('./middleware/logger')
const cors = require('cors')

require('./models')()

const app = express()

app.use( cors() )
app.use(express.urlencoded({ extended: true }))
app.use( logger )
app.use( express.static('public') )
app.use( express.json() )


app.use('/api/users', routes.users)
app.use('/api/quizzes', routes.quizzes)





const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Running on port ${PORT}`))