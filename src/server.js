import { GraphQLServer, PubSub } from 'graphql-yoga'

import { fragmentReplacements, resolvers } from './resolvers/index'
import prisma from './prisma'
import db from './db'

const pubSub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return { db, pubSub, prisma, request }
  },
  fragmentReplacements
})

export default server
