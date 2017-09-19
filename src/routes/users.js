const router = require('express').Router()
const _albums = require('../models/albums')
const _reviews = require('../models/reviews')
const _users = require('../models/users')

router.get('/:id', (req, res, next) => {
  _albums.all()
  .then((albums) => {
    _users.findByID(req.params.id)
    .then((user) => {
      if (!user) {
        next()
      } else {
        _reviews.findByUserID(req.params.id)
        .then((reviews) => {
           res.render('user-profile', {albums, reviews, user})
        }).catch(next)
      }
    }).catch(next)
  }).catch(next)
})

module.exports = router