const bcrypt = require('bcrypt')
const db = require('./db/db.js')

const users = {}

encryptText = (plainText) =>
  bcrypt.hashSync(plainText, bcrypt.genSaltSync(10))

users.validPassword = (plainText, hashedText) => 
  bcrypt.compareSync(plainText, hashedText)

users.all = () => 
  db.all('users')

users.create = (name, email, password) => 
  db.create(
    'users', 
    ['name', 'email', 'password'], 
    '$1, $2, $3', 
    [name, email, encryptText(password)]
  )

users.findByID = ID => 
  db.find('users', 'id', ID)
  .then(users => users[0])

users.findByEmail = email => 
  db.find('users', 'email', email)
  .then(users => users[0])

module.exports = users