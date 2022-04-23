const express = require('express')
require('dotenv').config()
const routes = require('./routes')
const logger = require('./middleware/logger')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const _404 = require('./routes/404')


require('./models')()

const app = express()


app.use( cors({
  origin: "http://localhost:8080"
}))
app.use(express.urlencoded({ extended: true }))
app.use( logger )
app.use( express.static('public') )
app.use( express.json() )


app.use('/api/users', routes.users)
app.use('/api/quizzes', routes.quizzes)
app.use('/api/images', routes.images)

app.use(errorHandler)
app.use(_404)





const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Running on port ${PORT}`))