const router = require('express').Router()
const _albums = require('../models/albums')
const _reviews = require('../models/reviews')
const _users = require('../models/users')

router.get('/', (req, res, next) => {
  _albums.all()
    .then((albums) => {
      _users.all()
        .then((users) => {
          _reviews.latest3()
            .then((reviews) => {
              res.render('index', {albums, reviews, users})
            }).catch(next)
        }).catch(next)
    }).catch(next)
})

module.exports = router
