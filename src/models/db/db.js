 pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const SQLInjections = {}

SQLInjections.all = table => 
  db.any(`
    SELECT * 
    FROM ${table} 
    ORDER BY timestamp DESC`)
  .catch(error => { 
    console.log('all = () => ', error)
    throw error
  })

SQLInjections.find = (table, column, value) => 
  db.any(`
    SELECT * 
    FROM ${table} 
    WHERE ${column}=$1 
    ORDER BY timestamp DESC`, value)
  .catch(error => {
    console.log('find = () => ', error)
    throw error
  })

SQLInjections.create = (table, columnsArray, $numsWithParens, valueArray) => 
  db.any(`
    INSERT INTO ${table} (${columnsArray})
    VALUES ${$nums}`, valueArray)
  .catch(error => {
    console.log('create = () => ', error)
    throw error
  })

SQLInjections.delete = (table, column, value) => 
  db.any(`
    DELETE FROM ${table}
    WHERE ${column}=$1`, value)
  .catch(error => {
    console.log('delete = () => ', error)
    throw error
  })

SQLInjections.limit = (table, limit) => 
  db.any(`
    SELECT * 
    FROM ${table}
    ORDER BY timestamp DESC
    LIMIT $1`, limit)
  .catch(error => {
    console.log('limit = () => ', error)
    throw error
  })

module.exports = SQLInjections
