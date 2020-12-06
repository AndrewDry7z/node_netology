const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const {Book} = require('./models')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());

const store = {
  books: []
}

const examples = ['test', '12345', 'qwerty']

for (let item of examples) {
  const newBook = new Book(
      item,
      `desctiption ${item}`,
      'some authors',
      'sample text',
      'something.jpg',
      'file'
  )
  store.books.push(newBook)
}

const {books} = store

app.post('/api/user/login', (req, res) => {
  res.json({
    id: 1,
    mail: "test@mail.ru"
  })
  res.status(201)
})

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    res.json(books[bookIndex])
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

app.post('/api/books', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
  )
  books.push(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    books[bookIndex] = {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      ...books[bookIndex]
    }
    res.json(books[bookIndex])
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    books.splice(bookIndex, 1)
    res.json(true)
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

app.listen(3000);
