const router = require('express').Router()
const Albums = require('../models/albums')
const Reviews = require('../models/reviews')
const Users = require('../models/users')

router.get('/:id', (req, res, next) => {
  Albums.findByID(req.params.id)
    .then((album) => {
      if (!album) {
        next()
      } else {
        Users.all()
          .then((users) => {
            Reviews.findByAlbumID(req.params.id)
              .then((reviews) => {
                res.render('album', {album, reviews, users})
              }).catch(next)
          }).catch(next)
      }
    }).catch(next)
})

router.route('/:id/reviews/new')
  .get((req, res, next) => {
    Albums.findByID(req.params.id)
      .then((album) => {
        res.render('new-review', {album})
      }).catch(next)
  })
  .post((req, res, next) => {
    if (!req.user) res.redirect('/sign-up')
    else {
      Reviews.create(
        req.user.id, req.params.id, req.body.review
      ).then(() => {
        res.redirect(`/albums/${req.params.id}`)
      }).catch(next)
    }
  })

module.exports = router
