const router = require('express').Router()
const Albums = require('../models/albums')
const Reviews = require('../models/reviews')
const Users = require('../models/users')

router.get('/:id', (req, res, next) => {
  Albums.all()
    .then((albums) => {
      Users.findByID(req.params.id)
        .then((user) => {
          if (!user) {
            next()
          } else {
            Reviews.findByUserID(req.params.id)
              .then((reviews) => {
                res.render('user-profile', {albums, reviews, user})
              }).catch(next)
          }
        }).catch(next)
    }).catch(next)
})

module.exports = router
