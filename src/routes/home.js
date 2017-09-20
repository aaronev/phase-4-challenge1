const router = require('express').Router()
const Albums = require('../models/albums')
const Reviews = require('../models/reviews')
const Users = require('../models/users')

router.get('/', (req, res, next) => {
  Albums.all()
    .then((albums) => {
      Users.all()
        .then((users) => {
          Reviews.latest3()
            .then((reviews) => {
              res.render('index', {albums, reviews, users})
            }).catch(next)
        }).catch(next)
    }).catch(next)
})

module.exports = router
