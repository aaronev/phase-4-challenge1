const db = require('./db/db.js')

const albums = {}

albums.all = () => 
  db.all('albums')

albums.findByID = ID =>
  db.find('albums', 'id', ID)
  .then(albums => albums[0])

module.exports = albums