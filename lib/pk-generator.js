const { split, reject, join, toLower } = require('ramda')
const slugify = require('slugify')

// Painting test
const name = {
  _id: 'painting_sunday-afternoon-on-the_island-of-la-grande-jatte',
  name: 'A Sunday Afternoon on the Island of La Grande Jatte',
  type: 'painting',
  movement: 'impressionism',
  artist: 'Georges Seurat',
  yearCreated: 1884,
  museum: { name: 'Art Institute of Chicago', location: 'Chicago' }
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

module.exports = pkGen
