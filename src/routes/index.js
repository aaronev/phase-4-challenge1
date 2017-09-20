const router = require('express').Router()

router.use('/', require('./home'))
router.use('/albums', require('./albums'))
router.use('/reviews', require('./reviews'))
router.use('/users', require('./users'))
router.use('/sign-up', require('./sign-up'))
router.use('/sign-in', require('./sign-in'))
router.use('/sign-out', require('./sign-out'))

module.exports = router
