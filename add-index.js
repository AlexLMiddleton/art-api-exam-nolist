require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)

db
  .createIndex({
    index: { fields: ['type'] }
  })
  .then(result =>
    db.find({
      selector: { type: 'painting' }
    })
  )
  .then(result => console.log(result))
