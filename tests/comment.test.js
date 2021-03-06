import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import { deleteComment, subscribeToComments } from './utils/operations'
import seedDatabase, { commentOne, postOne, userOne, userTwo } from './utils/seedDatabase'
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

test('Should subscribe to comments for a post', async (done) => {
  const variables = {
    postId: postOne.post.id
  }

  client.subscribe({ query: subscribeToComments, variables }).subscribe({
    next(response) {
      expect(response.data.comment.mutation).toBe('DELETED')

      done()
    }
  })

  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } })
})
