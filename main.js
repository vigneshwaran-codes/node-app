// console.log('put your code inside this file', process.argv)
// const stringArr = process.argv[2]
// const arr = JSON.parse(stringArr)

// console.log('max number is:', Math.max(...arr))

/* Older Syntax */
// const express = require('express')
// const { MongoClient } = require('MongoDB')

/* New syntax */
import express from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { MongoClient } from 'mongodb'
import { pollRouter } from './routes/poll.js'

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

app.listen(PORT, () => console.log('The Server is started', PORT))

async function genPassword(){
  const password = 'password@123'
  const salt = await bcrypt.genSalt(10) //More rounds - more secure -> dowside it takes long time
  const hashedPassword = await bcrypt.hash(password,salt)
  console.log(hashedPassword)
}

genPassword()