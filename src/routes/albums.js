const router = require('express').Router()
const _albums = require('../models/albums')
const _reviews = require('../models/reviews')
const _users = require('../models/users')

router.get('/:id', (req, res, next) => {
  _albums.findByID(req.params.id)
  .then((album) => {
    if (!album) { next() } 
    else {
     _users.all()
      .then((users) => {
        _reviews.findByAlbumID(req.params.id)
          .then((reviews) => {
            res.render('album', {album, reviews, users})
          }).catch(next)
      }).catch(next)
    }
  }).catch(next)
})

router.route('/:id/reviews/new')
  .get((req, res, next) => {
    _albums.findByID(req.params.id)
      .then((album) => {
        res.render('new-review', {album})
      }).catch(next)
  })
  .post((req, res, next) => {
    if (!req.user) {
      res.redirect('/sign-up')
    } else {      
      _reviews.create(
        req.user.id,
        req.params.id,
        req.body.review
      ).then(() => {
        res.redirect(`/albums/${req.params.id}`)
      }).catch(next)
    }
  })

module.exports = router
