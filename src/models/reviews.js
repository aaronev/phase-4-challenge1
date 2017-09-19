const db = require('./db/db.js')

const reviews = {}

reviews.all = () =>
  db.all('reviews')

reviews.latest3 = () => 
  db.limit('reviews', 3)

reviews.findByUserID = ID => 
  db.find('reviews', 'user_id', ID)

reviews.findByAlbumID = ID => 
  db.find('reviews', 'album_id', ID)

reviews.delete = ID => 
  db.delete('reviews', 'id', ID)

reviews.create = (userID, albumID, review) =>
  db.create(
    'reviews',
    ['user_id', 'album_id', 'review'],
    '$1, $2, $3',
    [userID, albumID, review]
  )

module.exports = reviews