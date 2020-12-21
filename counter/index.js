const express = require('express')
const router = express.Router()
const counterRounter = require('./router/counter')

app = new express()

app.use('/counter', counterRounter);


app.listen(3001)
