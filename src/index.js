require('dotenv').config()
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const router = express.Router()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.options('*', cors());
app.set("view engine", "ejs");

const {ApiBooksRouter} = require('./routes/api/books')
const booksRouter = require('./routes/books')
const userRouter = require('./routes/api/user')


app.use('/public', express.static(__dirname+"/public"));
app.use('/api/books', ApiBooksRouter);
app.use('/books', booksRouter);
app.use('/api/user', userRouter);

router.get('/', (req, res) => {
  res.redirect('/books')
})

async function start() {
  try {
    const PasswordDB = process.env.MNGPW;
    const NameDB = 'cssp';
    const UrlDB = `mongodb+srv://admin:${PasswordDB}@cluster0.ki1ai.mongodb.net/${NameDB}?retryWrites=true&w=majority`
    await mongoose.connect(UrlDB);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start();
