const express = require('express');
const logger = require('./middleware/logger')
const error404 = require('./middleware/error404')
const router = require('./routes/index')


app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(logger)

app.use('/api', router)
app.use(error404)

const PORT = process.env.PORT || 3000

app.listen(PORT)

module.exports = app