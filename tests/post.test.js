import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import { createPost, deletePost, getPosts, myPosts, subscribeToPosts, updatePost } from './utils/operations'
import seedDatabase, { postOne, postTwo, userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeAll(() => {
  jest.setTimeout(1000 * 60);
});

beforeEach(seedDatabase)

test('Should expose published posts', async () => {

  const response = await client.query({ query: getPosts })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].title).toBe('My published post')
  expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch user posts', async () => {
  const client = getClient(userOne.jwt)

  const { data } = await client.query({ query: myPosts })

  expect(data.myPosts.length).toBe(2)
})

test('Should be able to create posts', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    data: {
      title: 'A third post',
      body: '',
      published: true
    }
  }
  const { data } = await client.mutate({ mutation: createPost, variables })
  const exists = await prisma.exists.Post({ title: 'A third post' })

  expect(data.createPost.title).toBe('A third post')
  expect(data.createPost.published).toBe(true)
  expect(data.createPost.author.id).toBe(userOne.user.id)
  expect(exists).toBe(true)
})

test('Should be able to update own posts', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
    data: { published: false }
  }
  const { data } = await client.mutate({ mutation: updatePost, variables })
  const exists = await prisma.exists.Post({ id: postOne.post.id, published: false  })

  expect(data.updatePost.published).toBe(false)
  expect(exists).toBe(true)
})

test('Should be able to delete posts', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postTwo.post.id
  }
  const { data } = await client.mutate({ mutation: deletePost, variables })
  const exists = await prisma.exists.Post({ id: postTwo.post.id })

  expect(data.deletePost.id).toBe(postTwo.post.id)
  expect(exists).toBe(false)
})

test('Should subscribe to posts', async (done) => {
  client.subscribe({ query: subscribeToPosts }).subscribe({
    next(response) {
      expect(response.data.post.mutation).toBe('DELETED')

      done()
    }
  })

  await prisma.mutation.deletePost({ where: { id: postOne.post.id } })
})
