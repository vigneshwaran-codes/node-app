import express from 'express'
import { getPolls, getPollById, deletePollById, insertPoll, updatePollById, replacePollById } from '../helper.js'
import { createConnection } from '../index.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// app-> router & removed poll word (we know that pollRouter it start with /poll)

router
  .route('/')
  .get(auth, async (request, response) => {
    const client = await createConnection()
    const contestantAll = await getPolls(client, { id: { $gt: 1 } })
    response.send(contestantAll)
  }).post(auth, async (request, response) => {
    const client = await createConnection()
    const polls = request.body
    const contestants = await insertPoll(client, polls)
    response.send(contestants)
  })

router
  .route('/:id')
  .get(auth, async (request, response) => {
    const id = request.params.id
    // const contestant = poll.filter((data) => data.id === id)
    // console.log(id, contestant)
    const client = await createConnection()
    const contestant = await getPollById(client, +id)
    response.send(contestant)
  }).patch(auth, async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const newPoll = request.body
    const contestant = await updatePollById(client, +id, newPoll)
    response.send(contestant)
  }).delete(auth, async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const contestant = await deletePollById(client, +id)
    response.send(contestant)
  }).put(auth, async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const newPoll = request.body
    const contestant = await replacePollById(client, +id, newPoll)
    response.send(contestant)
  })

router.get('/name/:companyname', auth, async (request, response) => {
  const companyname = request.params.companyname
  const client = await createConnection()
  const contestants = await getPolls(client, { company: companyname })
  response.send(contestants)
})

router.get('/color/:colorname', auth, async (request, response) => {
  const colorname = request.params.colorname
  const client = await createConnection()
  const contestants = await getPolls(client, { color: colorname })
  response.send(contestants)
})

router.get('/content/:description', auth, async (request, response) => {
  const description = request.params.description
  const client = await createConnection()
  const contestants = await getPolls(client, { content: { $regex: description, $options: 'i' } })
  response.send(contestants)
})

export const pollRouter = router
