require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const reqFieldChecker = require('./lib/check-req-fields')
const objClean = require('./lib/clean-object')
const { isEmpty, prop, not, join } = require('ramda')
const { addArt, getArt, updateArt, deleteArt } = require('./dal')

const putArtworkReqFieldChecker = reqFieldChecker([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
])

const putArtistReqFieldChecker = reqFieldChecker([
  'name',
  'country',
  'birth',
  'death',
  'type',
  '_id',
  '_rev'
])

app.use(bodyParser.json())
////////////////////////////////////
////////// Home Route
////////////////////////////////////
app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})
////////////////////////////////////
////////// ADD A PAINTING
////////////////////////////////////
app.post('/paintings', (req, res, next) => {
  addArt(req.body)
    .then(addedArtResult => res.status(201).send(addedArtResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
  console.log('REQUEST BODY', req.body)
})

////////////////////////////////////
////////// ADD AN ARTIST
////////////////////////////////////
app.post('/artists', (req, res, next) => {
  addArt(req.body)
    .then(addedArtResult => res.status(201).send(addedArtResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// GET A PAINTING
////////////////////////////////////
app.get('/paintings/:id', (req, res, next) => {
  getArt(req.params.id)
    .then(art => res.send(art))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// GET AN ARTIST
////////////////////////////////////
app.get('/artists/:id', (req, res, next) => {
  getArt(req.params.id)
    .then(art => res.send(art))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// UPDATE A PAINTING
////////////////////////////////////
app.put('/paintings/:id', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    next(new HTTPError(400, 'Missing request body'))
    return
  } // Checks to make sure they've put something in the req.body to submit.  If not, return an error.

  // Creates an array of required properties to check the user's entry against
  const bodyCleaner = objClean([
    '_id',
    '_rev',
    'name',
    'movement',
    'artist',
    'yearCreated',
    'museum',
    'type'
  ])
  const cleanedBody = bodyCleaner(req.body) // compares the user's entry with our list of acceptable properties
  const missingFields = putArtworkReqFieldChecker(cleanedBody) // Look at our "cleaned" data and see if we're missing fields
  // console.log('BODYCLEANER', bodyCleaner(req.body))
  // console.log('CLEANEDBODY', cleanedBody)
  // console.log('MISSING FIELDS', missingFields)
  // Ensure all of our required fields are there.  If not, return an error.
  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Update request missing these fields: ${join(', ', missingFields)}`
      )
    )
    return
  }
  updateArt(cleanedBody) //Take our updateArt function, which puts our entry into the database, and pass it the cleanedBody
    .then(updatedArt => res.send(updatedArt))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// UPDATE AN ARTIST
////////////////////////////////////
app.put('/artists/:id', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    next(new HTTPError(400, 'Missing request body'))
    return
  } // Checks to make sure they've put something in the req.body to submit.  If not, return an error.

  // Creates an array of required properties to check the user's entry against
  const bodyCleaner = objClean([
    '_id',
    '_rev',
    'name',
    'country',
    'birth',
    'death',
    'type'
  ])
  const cleanedBody = bodyCleaner(req.body) // compares the user's entry with our list of acceptable properties
  const missingFields = putArtistReqFieldChecker(cleanedBody) // Look at our "cleaned" data and see if we're missing fields
  // console.log('BODYCLEANER', bodyCleaner(req.body))
  // console.log('CLEANEDBODY', cleanedBody)
  // console.log('MISSING FIELDS', missingFields)
  // Ensure all of our required fields are there.  If not, return an error.
  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Update request missing these fields: ${join(', ', missingFields)}`
      )
    )
    return
  }
  updateArt(cleanedBody) //Take our updateArt function, which puts our entry into the database, and pass it the cleanedBody
    .then(updatedArt => res.send(updatedArt))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// DELETE A PAINTING
////////////////////////////////////

app.delete('/paintings/:id', (req, res, next) => {
  deleteArt(req.params.id)
    .then(deletedArt => res.status(200).send(deletedArt))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// DELETE AN ARTIST
////////////////////////////////////

app.delete('/artists/:id', (req, res, next) => {
  deleteArt(req.params.id)
    .then(deletedArt => res.status(200).send(deletedArt))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

////////////////////////////////////
////////// ERROR HANDLER
////////////////////////////////////
app.use((err, req, res, next) => {
  console.log('ERROR', err)
  res.status(err.status).send(err.message)
})

app.listen(process.env.PORT || 4000, () =>
  console.log('App is now listening on port', process.env.PORT || 4000)
)

module.exports = app
