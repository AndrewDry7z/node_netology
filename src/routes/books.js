const express = require('express')
const Book = require("../models/Book");
const router = express.Router()
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  await Book.find({}, (error, books) => {
    res.render('index', {
      title: "Books list",
      books: books
    })
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

router.post('/create', async (req, res) => {
  const {title, description} = req.body
  const newBook = new Book({
    title,
    description
  })
  try {
    await newBook.save()
    res.redirect('/books')
  } catch (e) {
    console.error(e)
  }
})

router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Book.findById(id, (error, book) => {
      fetch(`http://localhost:3001/counter/${id}/incr`, {method: 'POST'})
          .then(res => res.json())
          .then(body => {

            res.render('view', {
              book: book,
              counter: body.counter
            })
          })
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect('/404');
  }
})

router.get('/:id/edit', async (req, res) => {
  const {id} = req.params
  try {
    await Book.findById(id, (error, book) => {
      fetch(`http://localhost:3001/counter/${id}/incr`, {method: 'POST'})
          .then(res => res.json())
          .then(body => {

            res.render('create', {
              title: "Edit book",
              book: book
            })
          })
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect('/404');
  }

})

router.get('/:id/delete', async (req, res) => {
  const {id} = req.params
  try {
    await Book.deleteOne({_id: id}, async (error, result) => {
      console.log(result)
      res.redirect(`/books`);
    })
  } catch {
    res.status(404).redirect('/404');
  }
})

router.post('/:id/edit', async (req, res) => {
  const {id} = req.params
  const {title, description} = req.body;

  try {
    await Book.findByIdAndUpdate(id, {title: title, description: description}, (error, book) => {
      res.redirect(`/books/${id}`)
    })
  } catch {
    res.status(404)
    res.json('Nothing found')
  }
})

module.exports = router
