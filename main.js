// console.log('put your code inside this file', process.argv)
// const stringArr = process.argv[2]
// const arr = JSON.parse(stringArr)

// console.log('max number is:', Math.max(...arr))

const express = require('express')
const { MongoClient } = require('MongoDB')
const app = express()
const PORT = 5000
const poll = [
  {
    id: '1',
    company: 'OnePlus',
    color: 'red',
    lineSpacing: '4px',
    content: 'never settle'
  },
  {
    id: '2',
    company: 'Apple',
    color: 'crimson',
    lineSpacing: '3px',
    content: 'Think Different ,not too Different'
  },
  {
    id: '3',
    company: 'samsung',
    color: 'skyblue',
    content: 'innovation of Galaxy'
  },
  {
    id: '4',
    company: 'Mi',
    color: 'orange',
    content: 'Just for fans'
  }
]
async function createConnection () {
  const MONGO_URL =
    'mongodb+srv://vigneshwarank:aEvL6GhZAIhddFVC@cluster0.p5wxf.mongodb.net/contestants?retryWrites=true&w=majority'
  // Todo
  const client = new MongoClient(MONGO_URL)

  try {
    await client.connect()
    return client
    // getPollById(client, '1')
  } catch (err) {
    console.log(err)
  }
}

async function getPollById (client, id) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .findOne({ id: id })
  console.log('Succesfully Connected', result)
  return result
}

async function insertPoll (client, poll) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .insertMany(poll)
  console.log('Inserted Succesfully', result)
}

createConnection()

app.get('/', (request, response) => {
  response.send('Hello Vigneshwaran K')
})

app.get('/poll', (request, response) => {
  response.send(poll)
})

app.get('/poll/:id', async (request, response) => {
  const id = request.params.id

  // const contestant = poll.filter((data) => data.id === id)
  // console.log(id, contestant)
  const client = await createConnection()
  const contestant = await getPollById(client, id)

  response.send(contestant)
})

app.listen(PORT, () => console.log('The Server is started', PORT))
