const router = require('express').Router()
const Reviews = require('../models/reviews')

router.delete('/:id', (req, res, next) => {
  if (!req.user) {
    res.redirect('/authenticate/sign-up')
  } else {
    Reviews.delete(req.params.id).catch(next)
  }
})

module.exports = router
