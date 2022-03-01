/* Older Syntax */
// const express = require('express')
// const { MongoClient } = require('MongoDB')

/* New syntax */
import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import { pollRouter } from './routes/poll.js'
import { userRouter } from './routes/user.js'

dotenv.config()
// loaded on process .env

const app = express()
const PORT = process.env.PORT

app.use(express.json())

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

export async function createConnection () {
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

app.get('/', (request, response) => {
  response.send('Hello Vigneshwaran K')
})

app.use('/poll', pollRouter)
// '/poll/:id'
// '/poll/name/:companyname'
// post '/poll'

// Signup -> /user/signup
app.use('/user', userRouter)

app.listen(PORT, () => console.log('The Server is started', PORT))
