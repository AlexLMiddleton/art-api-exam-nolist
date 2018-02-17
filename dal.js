require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-http'))
const HTTPError = require('node-http-error')
const { tail, head, replace } = require('ramda')
const slugify = require('slugify')

const db = new PouchDB(process.env.COUCHDB_URL)

const addArt = artwork => {
  console.log('OUR ARTWORK OBJECT: ', artwork)
  //const newArt = artwork.name.replace(/^The\s|A\s/i, ' ')
  //console.log('FIRST NEWART ENTRY: ', newArt)
  artwork._id = `${artwork.type}_${slugify(artwork.name, {
    lower: true
  })}`
  console.log('After _id', artwork.name)
  return addDoc(artwork)
}

const getArt = artwork => db.get(artwork)

const updateArt = artwork => db.put(artwork)

const deleteArt = artwork =>
  db.get(artwork).then(art => {
    return db.remove(art)
  })

const addDoc = doc => db.put(doc)

module.exports = { addArt, getArt, updateArt, deleteArt }
