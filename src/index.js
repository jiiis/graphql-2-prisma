import '@babel/polyfill'
import { GraphQLServer, PubSub } from 'graphql-yoga'

import { fragmentReplacements, resolvers } from './resolvers/index'
import prisma from './prisma'
import db from './db'

// Scalar types: String, Boolean, Int, Float, ID

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return { db, pubSub, prisma, request }
  },
  fragmentReplacements
})

server.start({ post: process.env.PORT || 4000 }, () => {
  console.log('The server is up!')
})
