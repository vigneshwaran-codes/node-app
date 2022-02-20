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
