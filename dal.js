require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error')
const { tail, head, replace, pluck } = require('ramda')
const slugify = require('slugify')
const pkGen = require('./lib/pk-generator')

const db = new PouchDB(process.env.COUCHDB_URL)

const addArt = artwork => {
  artwork._id = pkGen(artwork)
  return addDoc(artwork)
}

const getArt = artwork => db.get(artwork)

const updateArt = artwork => db.put(artwork)

const deleteArt = artwork =>
  db.get(artwork).then(art => {
    return db.remove(art)
  })

const addDoc = doc => db.put(doc)

const allDocs = options =>
  db.allDocs(options).then(docs => pluck('doc', docs.rows))

const findDocs = query => db.find(query).then(result => result.docs)

module.exports = { addArt, getArt, updateArt, deleteArt, allDocs, findDocs }
