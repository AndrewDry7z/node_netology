const express = require('express')
const router = express.Router()
const {Book} = require('../models')
const path = require('path')
const fileMiddleware = require('../middleware/file');

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
      'file',
      'file'
  )
  store.books.push(newBook)
}

const {books} = store

router.get('/', (req, res) => {
  res.json(books)
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    res.json(books[bookIndex])
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

router.get('/:id/download', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    res.redirect('/public/' + path.basename(books[bookIndex].fileBook))
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

router.post('/', fileMiddleware.single('book'), (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
  )

  if (req.file) {
    newBook.fileBook = req.file.path
  } else {
    res.json(null);
  }

  books.push(newBook)
  res.json(newBook)
  res.status(201)
})

router.put('/:id', fileMiddleware.single('book'), (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    }
    res.json(books[bookIndex])
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

router.delete('/:id', (req, res) => {
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

module.exports = router;
