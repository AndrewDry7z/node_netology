const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  res.json({
    id: 1,
    mail: "test@mail.ru"
  })
  res.status(201)
})

module.exports = router;
