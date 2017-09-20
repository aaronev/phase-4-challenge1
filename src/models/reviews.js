const DB = require('./db/db.js')

const Reviews = {}

Reviews.all = () =>
  DB.all('reviews')

Reviews.latest3 = () =>
  DB.limit('reviews', 3)

Reviews.findByUserID = ID =>
  DB.find('reviews', 'user_id', ID)

Reviews.findByAlbumID = ID =>
  DB.find('reviews', 'album_id', ID)

Reviews.delete = ID =>
  DB.delete('reviews', 'id', ID)

Reviews.create = (userID, albumID, review) =>
  DB.create(
    'reviews',
    ['user_id', 'album_id', 'review'],
    '$1, $2, $3',
    [userID, albumID, review]
  )

module.exports = Reviews
