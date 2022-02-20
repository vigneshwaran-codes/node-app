// console.log('put your code inside this file', process.argv)
// const stringArr = process.argv[2]
// const arr = JSON.parse(stringArr)

// console.log('max number is:', Math.max(...arr))

/* Older Syntax */
// const express = require('express')
// const { MongoClient } = require('MongoDB')

/* New syntax */
import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT
// const poll = [
//   {
//     id: '1',
//     company: 'OnePlus',
//     color: 'red',
//     lineSpacing: '4px',
//     content: 'never settle'
//   },
//   {
//     id: '2',
//     company: 'Apple',
//     color: 'crimson',
//     lineSpacing: '3px',
//     content: 'Think Different ,not too Different'
//   },
//   {
//     id: '3',
//     company: 'samsung',
//     color: 'skyblue',
//     content: 'innovation of Galaxy'
//   },
//   {
//     id: '4',
//     company: 'Mi',
//     color: 'orange',
//     content: 'Just for fans'
//   }
// ]

// Create Connection

async function createConnection () {
  const MONGO_URL = process.env.MONGO_URI
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
async function getPolls (client, filter) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .find(filter)
    .toArray()
  console.log('Succesfully Connected', result)
  return result
}

// async function insertPoll (client, poll) {
//   const result = await client
//     .db('contestants')
//     .collection('poll')
//     .insertMany(poll)
//   console.log('Inserted Succesfully', result)
// }

createConnection()

app.get('/', (request, response) => {
  response.send('Hello Vigneshwaran K')
})

app.get('/poll', async (request, response) => {
  const client = await createConnection()
  const contestantAll = await getPolls(client, { id: { $gt: 1 } })
  response.send(contestantAll)
})

app.get('/poll/name/:companyname', async (request, response) => {
  const companyname = request.params.companyname
  const client = await createConnection()
  const contestants = await getPolls(client, { company: companyname })
  response.send(contestants)
})

app.get('/poll/color/:colorname', async (request, response) => {
  const colorname = request.params.colorname
  const client = await createConnection()
  const contestants = await getPolls(client, { color: colorname })
  response.send(contestants)
})

app.get('/poll/content/:description', async (request, response) => {
  const description = request.params.description
  const client = await createConnection()
  const contestants = await getPolls(client, { content: { $regex: description, $options: 'i' } })
  response.send(contestants)
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
