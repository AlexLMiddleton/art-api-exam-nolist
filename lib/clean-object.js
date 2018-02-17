const { pick } = require('ramda')

module.exports = props => obj => pick(props, obj)
//  Picks the props input off the object
