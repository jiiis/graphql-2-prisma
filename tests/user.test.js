import 'cross-fetch/polyfill'

import prisma from '../src/prisma'
import { createUser, getProfile, getUsers, login } from './utils/operations'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeAll(() => {
  jest.setTimeout(1000 * 60);
});

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Hao Chang',
      email: 'hao@abc.com',
      password: '222222222'
    }
  }
  const response = await client.mutate({ mutation: createUser, variables })
  const userExists = await prisma.exists.User({ id: response.data.createUser.user.id })

  expect(userExists).toBe(true)
})

test('Should not sign up users with invalid passwords', async () => {
  const variables = {
    data: {
      name: 'Hao Chang',
      email: 'hao@abc.com',
      password: '333'
    }
  }

  await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow()
})

test('Should not login with bad credentials', async () => {
  const variables = {
    email: 'april@abc.com',
    password: '222222222'
  }

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('April Chang')
})

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})
