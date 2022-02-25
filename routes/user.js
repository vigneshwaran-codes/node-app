import express from 'express'
import { createConnection } from '../main.js'
import { insertUser } from '../helper.js'
import bcrypt from 'bcrypt'

const router = express.Router()

// user password - create a user

router
  .route('/signup')
  .post(async (request, response) => {
    const { username, password, avatar } = request.body
    const client = await createConnection()
    const hashedPassword = await genPassword(password)
    const newUser = await insertUser(client, { username: username, password: hashedPassword, avatar })
    console.log(hashedPassword, newUser)
    response.send(hashedPassword)
  })

async function genPassword (password) {
  const salt = await bcrypt.genSalt(10) // More rounds - more secure -> dowside it takes long time
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export const userRouter = router
