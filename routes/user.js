import express from 'express'
import { createConnection } from '../main.js'
import { insertUser, getUsers, getUser } from '../helper.js'
import bcrypt from 'bcrypt'

const router = express.Router()

//  get all users in databse

router
  .route('/')
  .get(async (request, response) => {
    const client = await createConnection()
    const contestantAll = await getUsers(client, { })
    response.send(contestantAll)
  })

// user password - create a user

router
  .route('/signup')
  .post(async (request, response) => {
    const { username, password, avatar } = request.body
    const client = await createConnection()
    const hashedPassword = await genPassword(password)
    const newUser = await insertUser(client, { username: username, password: hashedPassword, avatar })
    // console.log(hashedPassword, newUser)
    response.send(newUser)
  })

//  Login

router
  .route('/login')
  .post(async (request, response) => {
    const { username, password } = request.body
    const client = await createConnection()
    const user = await getUser(client, { username: username })
    console.log(user)
    const inDbStorePassword = user.password
    const isPasswordMatch = await bcrypt.compare(password, inDbStorePassword)
    if (isPasswordMatch) {
      response.send({ message: 'Successfull login' })
    } else {
      response.send({ message: 'Invalid login' })
    }
  })

async function genPassword (password) {
  const salt = await bcrypt.genSalt(10) // More rounds - more secure -> dowside it takes long time
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export const userRouter = router
