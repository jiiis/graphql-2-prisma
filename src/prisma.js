import { Prisma } from 'prisma-binding'

import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
})

export default prisma

// const createPostForUser = async (userId, postData) => {
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...postData,
//       author: {
//         connect: {
//           id: userId
//         }
//       }
//     }
//   }, '{ id }')
//   const user = await prisma.query.user({
//     where: {
//       id: userId
//     }
//   }, '{ id name email posts { id title published } }')
//
//   return user
// }
//
// createPostForUser('ckchos72u00ev0829qi1yjbuf', {
//   title: 'Another post with async await example',
//   body: '',
//   published: true
// }).then((user) => console.log(111111, JSON.stringify(user, undefined, 2)))
