const router = require('express').Router()
const Users = require('../models/users')
const passport = require('../config/authentication')

router.route('/')
  .get((req, res) => {
    if (!req.user) {
      res.render('sign-up')
    } else {
      res.redirect(`/users/${req.user.id}`)
    }
  })
  .post((req, res, next) => {
    const {name, email, password} = req.body
    Users.findByEmail(email)
      .then((foundEmail) => {
        if (foundEmail) {
          req.flash('errorSignUp', 'Email already exist!')
          res.redirect('/sign-up')
        } else {
          Users.create(name, email, password)
            .then(() => { next() }).catch(next)
        }
      }).catch(next)
  }, passport.authenticate('local'),
  (req, res) => {
    res.redirect('/sign-up')
  })

module.exports = router
