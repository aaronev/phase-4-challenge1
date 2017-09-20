# Vinyl

A community for record enthusiasts to review their favorite albums.

## Getting Started

### Set Up Database
Use the following commands to set up and seed the PSQL database:
```
1. `$ npm run db:create`  : Create PostgreSQL database `vinyl`
2. `$ npm run db:schema`  : Set ups the database tables
3. `$ npm run db:seed`    : Loads the datas for each table
```

### Set Up Server
Use the following commands to set up the server:
```
1. `$ npm install`        : Installs all dependencies
2. `$ npm start`          : Server at http://localhost:3000
```
Once server is running sign up and then sign in.

### MVC

```sh
README.md           # you are here
package.json        # npm standard
.eslintrc           # eslint config
```
```sh
src/                # contains developer contents
configurations/     # configurations throughout the codebase
authentication.js   # configured passport authentication
models/             # folder is for abstract functions 
database/           # connection and queries
database.js         # file within database for connections and queries
schema.sql          # shows all the columns of each tables
seed.sql            # seed the ablums, users, and reviews data
public/             # static folder for image files, css, & browser js
routes/             # folder contains routes for server
views/              # folder renders ejs html template
server.js           # web server
```
