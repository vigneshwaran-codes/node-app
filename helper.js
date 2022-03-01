export async function getPollById (client, id) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .findOne({ id: id })
  console.log('Succesfully Connected', result)
  return result
}
export async function deletePollById (client, id) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .deleteOne({ id: id })
  console.log('Succesfully Deleted', result)
  return result
}
export async function getPolls (client, filter) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .find(filter)
    .toArray()
  console.log('Succesfully Connected', result)
  return result
}
export async function insertPoll (client, polls) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .insertMany(polls)
  console.log('Inserted Succesfully', result)
}

export async function insertUser (client, user) {
  const result = await client
    .db('contestants')
    .collection('user')
    .insertOne(user)
  console.log('Inserted Succesfully', result)
  return result
}

export async function getUsers (client, filter) {
  const result = await client
    .db('contestants')
    .collection('user')
    .find(filter)
    .toArray()
  console.log('Succesfully Connected', result)
  return result
}

export async function getUser (client, filter) {
  const result = await client
    .db('contestants')
    .collection('user')
    .findOne(filter)
  console.log('Succesfully Connected', result)
  return result
}

export async function updatePollById (client, id, newPoll) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .updateOne({ id: id }, { $set: newPoll })
  console.log('Succesfully Updated', result)
  return result
}

export async function replacePollById (client, id, newPoll) {
  const result = await client
    .db('contestants')
    .collection('poll')
    .replaceOne({ id: id }, { $set: newPoll })
  console.log('Succesfully Updated', result)
  return result
}
