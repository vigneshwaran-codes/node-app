/* Older Syntax */
// const express = require('express')
// const { MongoClient } = require('MongoDB')

/* New syntax */
import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import { pollRouter } from './routes/Poll.js'
import { userRouter } from './routes/user.js'
import cors from 'cors'

dotenv.config()
// loaded on process .env

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use(cors())

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
  response.send('Welcome to my node app')
})

//  Router
app.use('/poll', pollRouter)
// Signup -> /user/signup
app.use('/user', userRouter)

// '/poll/:id'
// '/poll/name/:companyname'
// post '/poll'

app.listen(PORT, () => console.log('The Server is started', PORT))
