require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL)
PouchDB.plugin(require('pouchdb-adapter-http'))

console.log(process.env.COUCHDB_URL)

db
  .bulkDocs([
    {
      _id: 'painting_starry-night',
      name: 'The Starry Night',
      type: 'painting',
      movement: 'post-impressionism',
      artist: 'Vincent van Gogh',
      yearCreated: 1889,
      museum: { name: 'Museum of Modern Art', location: 'New York' }
    },
    {
      _id: 'painting_water-lilies-nympheas',
      name: 'Water Lilies Nympheas',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Claude Monet',
      yearCreated: 1907,
      museum: { name: 'Art Gallery of Ontario', location: 'Toronto' }
    },
    {
      _id: 'painting_last-supper',
      name: 'The Last Supper',
      type: 'painting',
      movement: 'Renaissance',
      artist: 'Leonardo da Vinci',
      yearCreated: 1495,
      museum: { name: 'Santa Maria delle Grazie', location: 'Milan' }
    },
    {
      _id: 'painting_sunday-afternoon-on-the_island-of-la-grande-jatte',
      name: 'A Sunday Afternoon on the Island of La Grande Jatte',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Georges Seurat',
      yearCreated: 1884,
      museum: { name: 'Art Institute of Chicago', location: 'Chicago' }
    },
    {
      _id: 'painting_guernica',
      name: 'Guernica',
      type: 'painting',
      movement: 'surrealism',
      artist: 'Pablo Picasso',
      yearCreated: 1937,
      museum: {
        name: 'Museo Nacional Centro de Arte Reina Sofía',
        location: 'Madrid'
      }
    },
    {
      _id: 'painting_bal-du-moulin-de-la-galette',
      name: 'Bal du moulin de la Galette',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Pierre-Auguste Renoires',
      yearCreated: 1876,
      museum: { name: 'Musée d’Orsay', location: 'Paris' }
    },
    {
      _id: 'artist_claude-monet',
      name: 'Claude Monet',
      country: 'France',
      birth: '1840',
      death: '1926',
      type: 'artist',
      _rev: '1-ad1bb2a59a964b9a9d485a96cb29adad'
    },
    {
      _id: 'artist_bob-ross',
      name: 'Bob Ross',
      country: 'United States',
      birth: '1953',
      death: '2010',
      type: 'artist',
      _rev: '1-edc15892fede4738b384322a81948194'
    },
    {
      _id: 'artist_vincent-van-gogh',
      name: 'Vincent van Gogh',
      country: 'Netherlands',
      birth: '1853',
      death: '1890',
      type: 'artist',
      _rev: '1-801fd4eee7de46c393a1a42deecedbdb'
    }
  ])
  .then(result => console.log('Documents successfully uploaded!', result))
  .catch(err => console.log('Error uploading documents', err))
