const router = require('express').Router()
const _reviews = require('../models/reviews')

router.delete('/:id', (req, res, next) => {
  if(!req.user) {
    res.redirect('/authenticate/sign-up')
  } else {
    _reviews.delete(req.params.id).catch(next)
  }
})

module.exports = router