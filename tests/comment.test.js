import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import { deleteComment } from './utils/operations'
import seedDatabase, { commentOne, userOne, userTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeAll(() => {
  jest.setTimeout(1000 * 60);
});

beforeEach(seedDatabase)

test('Should delete own comments', async () => {
  const client = getClient(userTwo.jwt)
  const variables = {
    id: commentOne.comment.id
  }
  const { data } = await client.mutate({ mutation: deleteComment, variables })
  const exists = await prisma.exists.Comment({ id: commentOne.comment.id })

  expect(data.deleteComment.id).toBe(commentOne.comment.id)
  expect(exists).toBe(false)
})

test('Should not delete other users\' comments', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: commentOne.comment.id
  }

  await expect(client.mutate({ mutation: deleteComment, variables })).rejects.toThrow()
})
