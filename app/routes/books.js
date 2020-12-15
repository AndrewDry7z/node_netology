const express = require('express')
const Book = require("../models/Book");
const router = express.Router()
const {store} = require('./api/books')
const {books} = store

router.get('/', (req, res) => {
  res.render('index', {
    title: "Books list",
    books: books
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: "Create new book",
    book: {},
    params: {
      method: 'POST',
      action: '/books/create',
      enctype: 'application/x-www-form-urlencoded'
    }
  })
})

router.post('/create', (req, res) => {
  const {title, description} = req.body
  const newBook = new Book(
      title,
      description
  )
  books.push(newBook)
  res.redirect('/books/')
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    res.render('view', {
      book: books[bookIndex]
    })
  } else {
    res.status(404);
    res.json('Nothing found')
  }
})

router.get('/:id/edit', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  res.render('create', {
    title: "Edit book",
    book: books[bookIndex]
  })
})

router.get('/:id/delete', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  if (bookIndex > -1) {
    books.splice(bookIndex, 1);
    res.redirect(`/books`);
  } else {
    res.status(404).redirect('/404');
  }
})

router.post('/create', (req, res) => {
  const {title, description} = req.body
  const newBook = new Book(
      title,
      description
  )
  books.push(newBook)
  res.redirect('/books/')
})

router.post('/:id/edit', (req, res) => {
  const {id} = req.params
  const bookIndex = books.findIndex(item => item.id === id)
  const {title, description} = req.body;
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      description,
    };
    res.redirect(`/books/${id}`)
  } else {
    res.status(404)
    res.json('Nothing found')
  }
})

module.exports = router
