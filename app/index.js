const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());

const booksRouter = require('./routes/books')
const userRouter = require('./routes/user')

app.use('/public', express.static(__dirname+"/public"));
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

app.listen(3000);
