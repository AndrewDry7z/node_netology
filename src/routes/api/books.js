const express = require('express')
const router = express.Router()
const {Book} = require('../../models')
const path = require('path')
const fileMiddleware = require('../../middleware/file');

router.get('/', async (req, res) => {
  await Book.find({}, (error, books) => {
    res.json(books)
  })
})

router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Book.findById(id, (error, book) => {
      res.json(book)
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect('/404');
  }
})

router.get('/:id/download', async (req, res) => {
  const {id} = req.params
  try {
    await Book.findById(id, (error, book) => {
      res.redirect('/public/' + path.basename(book.fileBook))
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect('/404');
  }
})

router.post('/', fileMiddleware.single('book'), async (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  })

  if (req.file) {
    newBook.fileBook = req.file.path
  } else {
    newBook.fileBook = ''
  }
  try {
    await newBook.save()
    res.json(newBook)
    res.status(201)
  } catch (error) {
    console.error(error)
    res.status(500).json
  }

})

router.put('/:id', fileMiddleware.single('book'), async (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
  const {id} = req.params

  try {
    await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    })
  } catch (error) {
    console.error(error)
    res.status(500).json
  }

})

router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Book.deleteOne({_id: id}, async (error, result) => {
      console.log(result)
      res.redirect(`/books`);
    })
  } catch (error) {
    console.error(error)
    res.status(404).redirect('/404');
  }
})

const ApiBooksRouter = router
module.exports = {ApiBooksRouter, Book}
