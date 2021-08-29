const {MongoClient} = require('mongodb');

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)
let database = null

async function run() {
  try {
    await client.connect();
    console.log('connect mongoDb success!')
    database =  client.db('entertain');
    
  } finally {
    // await client.close();
  }
}

function getDatabase() {
  return database
}

module.exports = {
  run,
  getDatabase
}