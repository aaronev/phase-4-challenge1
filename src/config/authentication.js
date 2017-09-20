const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('../models/users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  users.findByID(id)
    .then(user => done(null, user))
})

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, plainTextPassword, done) => {
  users.findByEmail(email)
    .then((user) => {
      if (!user) {
        return done(null, false, req.flash('errorLogin', 'Email not found, please sign up!'))
      }
      if (users.validPassword(plainTextPassword, user.password)) {
        return done(null, user)
      }
      return done(null, false, req.flash('errorLogin', 'Incorrect password!'))
    })
}))

module.exports = passport
