import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'April Chang',
    email: 'april@abc.com',
    password: bcrypt.hashSync('111111111')
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: 'My published post',
    body: '',
    published: true,
  },
  post: undefined
}

const postTwo = {
  input: {
    title: 'My draft post',
    body: '',
    published: false
  },
  post: undefined
}

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers()
  await prisma.mutation.deleteManyPosts()

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // Create posts
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
}

export { seedDatabase as default, userOne, postOne, postTwo }
