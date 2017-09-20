const DB = require('./db/db.js')

const Albums = {}

Albums.all = () =>
  DB.all('albums')

Albums.findByID = ID =>
  DB.find('albums', 'id', ID)
    .then(albums => albums[0])

module.exports = Albums
