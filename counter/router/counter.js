const express = require('express')
const router = express.Router()
const fs = require('fs')

router.post('/:id/incr', (req, res) => {
  const bookId = req.params.id
  const rawData = require('../counter.json')
  const data = JSON.stringify(rawData)
  const counterJson = JSON.parse(data)
  const book = counterJson.filter(item => item.id === bookId)

  if (book.length) {
    counterJson[counterJson.indexOf(book[0])].counter++
  } else {
    const newBook = {
      "id": bookId,
      "counter": 1
    }
    counterJson.push(newBook)
  }
  res.json(counterJson.filter(item => item.id === bookId)[0])
  const newData = JSON.stringify(counterJson)
  fs.writeFileSync('./counter.json', newData);
})

router.get('/:id', (req, res) => {
  const bookId = req.params.id
  const rawData = require('../counter.json')
  const data = JSON.stringify(rawData)
  const counterJson = JSON.parse(data)

  res.json(counterJson.filter(item => item.id === bookId)[0].counter)
})

router.get('/', (req, res) => {
  const bookId = req.params.id
  const rawData = require('../counter.json')
  const data = JSON.stringify(rawData)
  const counterJson = JSON.parse(data)

  res.json(counterJson)
})


module.exports = router
