const router = require('express').Router()
const passport = require('../config/authentication')

router.route('/')
  .get((req, res) => {
    if (!req.user) res.render('sign-in')
    else {
      res.redirect(`/users/${req.user.id}`)
    }
  })
  .post(passport.authenticate('local', {
    successRedirect: '/sign-in',
    failureRedirect: '/sign-in',
    failureFlash: true
  }))

module.exports = router
