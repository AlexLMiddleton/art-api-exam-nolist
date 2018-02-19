const { difference, keys } = require('ramda')

module.exports = requiredFields => data =>
  difference(requiredFields, keys(data))

// Find the difference between the user's input and the keys in our object's key:value pairs
