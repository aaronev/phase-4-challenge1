const bcrypt = require('bcrypt')
const DB = require('./db/db.js')

const Users = {}

const encryptText = plainText =>
  bcrypt.hashSync(plainText, bcrypt.genSaltSync(10))

Users.validPassword = (plainText, hashedText) =>
  bcrypt.compareSync(plainText, hashedText)

Users.all = () =>
  DB.all('users')

Users.findByID = ID =>
  DB.find('users', 'id', ID)
    .then(users => users[0])

Users.findByEmail = email =>
  DB.find('users', 'email', email)
    .then(users => users[0])

Users.create = (name, email, password) =>
  DB.create(
    'users',
    ['name', 'email', 'password'],
    '$1, $2, $3',
    [name, email, encryptText(password)]
  )

module.exports = Users
