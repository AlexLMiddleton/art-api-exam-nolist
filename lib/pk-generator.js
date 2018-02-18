const { split, reject, join, toLower } = require('ramda')
const slugify = require('slugify')

// Painting test
const name = {
  name: 'The Starry Night',
  type: 'painting',
  movement: 'post-impressionism',
  artist: 'Vincent van Gogh',
  yearCreated: 1889,
  museum: { name: 'Museum of Modern Art', location: 'New York' }
}

// Artist test
/*const Monet = {
  _id: 'artist_claude-monet',
  name: 'Claude Monet',
  country: 'France',
  birth: '1840',
  death: '1926',
  type: 'artist',
  _rev: '1-ad1bb2a59a964b9a9d485a96cb29adad'
}*/

function pkGen(obj) {
  const splitPK = split(' ', obj.name)
  const noTheOrA = reject(word => word === 'The' || word === 'A', splitPK)
  const joinWords = join(' ', noTheOrA)
  return `${obj.type}_${slugify(joinWords, { lower: true })}`
}

console.log(pkGen(name))

module.exports = pkGen
