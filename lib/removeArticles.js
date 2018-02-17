const { tail } = require('ramda')

const removeArticles = name => {
  name.toLowerCase().split(' ')
  if (name[0] === 'the' || name[0] === 'a') {
    return tail(name)
  } else {
    return name
  }
}

const obj = {
  name: 'A Persistence of Memory',
  type: 'painting',
  movement: 'surrealism',
  artist: 'Salvador Dali',
  yearCreated: 1931,
  museum: { name: 'Musuem of Modern Art', location: 'New York' }
}

removeArticles(obj.name)

// const splitArt = artwork.name.toLowerCase().split(' ')
// if (splitArt[0] === 'the' || splitArt[0] === 'a') {
//   console.log(tail(splitArt).join(' '))
// }
