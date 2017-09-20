const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const SQLInjections = {}

SQLInjections.all = table =>
  db.any(`
    SELECT *
    FROM ${table}
    ORDER BY timestamp DESC`)
    .catch((error) => {
      console.error('all = () => ', error)
      throw error
    })

SQLInjections.find = (table, column, value) =>
  db.any(`
    SELECT *
    FROM ${table}
    WHERE ${column}=$1
    ORDER BY timestamp DESC`, value)
    .catch((error) => {
      console.error('find = () => ', error)
      throw error
    })

SQLInjections.create = (table, columnsArray, $numsString, valueArray) =>
  db.none(`
    INSERT INTO ${table} (${columnsArray})
    VALUES (${$numsString})`, valueArray)
    .catch((error) => {
      console.error('create = () => ', error)
      throw error
    })

SQLInjections.delete = (table, column, value) =>
  db.none(`
    DELETE FROM ${table}
    WHERE ${column}=$1`, value)
    .catch((error) => {
      console.error('delete = () => ', error)
      throw error
    })

SQLInjections.limit = (table, limit) =>
  db.any(`
    SELECT *
    FROM ${table}
    ORDER BY timestamp DESC
    LIMIT $1`, limit)
    .catch((error) => {
      console.error('limit = () => ', error)
      throw error
    })

module.exports = SQLInjections
