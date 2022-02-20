import express from 'express'
import { getPolls, getPollById, deletePollById, insertPoll } from '../helper.js'
import { createConnection } from '../main.js'

const router = express.Router()

// app-> router & removed poll word (we know that pollRouter it start with /poll)

router
  .route('/')
  .get(async (request, response) => {
    const client = await createConnection()
    const contestantAll = await getPolls(client, { id: { $gt: 1 } })
    response.send(contestantAll)
  }).post(async (request, response) => {
    const client = await createConnection()
    const polls = request.body
    const contestants = await insertPoll(client, polls)
    response.send(contestants)
  })

router
  .route('/:id')
  .get(async (request, response) => {
    const id = request.params.id
    // const contestant = poll.filter((data) => data.id === id)
    // console.log(id, contestant)
    const client = await createConnection()
    const contestant = await getPollById(client, +id)
    response.send(contestant)
  }).delete(async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const contestant = await deletePollById(client, +id)
    response.send(contestant)
  })

router.get('/name/:companyname', async (request, response) => {
  const companyname = request.params.companyname
  const client = await createConnection()
  const contestants = await getPolls(client, { company: companyname })
  response.send(contestants)
})

router.get('/color/:colorname', async (request, response) => {
  const colorname = request.params.colorname
  const client = await createConnection()
  const contestants = await getPolls(client, { color: colorname })
  response.send(contestants)
})

router.get('/content/:description', async (request, response) => {
  const description = request.params.description
  const client = await createConnection()
  const contestants = await getPolls(client, { content: { $regex: description, $options: 'i' } })
  response.send(contestants)
})

export const pollRouter = router
