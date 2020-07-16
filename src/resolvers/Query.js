import getUserId from "../utils/getUserId";

const Query = {
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.query.user({ where: { id: userId } }, info)
  },
  users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = { first, skip, after, orderBy }

    if (query) {
      opArgs.where = { name_contains: query }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = { where: { published: true }, first, skip, after, orderBy };

    if (query) {
      opArgs.where.OR = [
        { title_contains: query },
        { body_contains: query }
      ]
    }

    return prisma.query.posts(opArgs, info)
  },
  myPosts(parent, { query, first, skip, after, orderBy }, { prisma, request }, info) {
    const userId = getUserId(request)
    const opArgs = { where: { author: { id: userId } }, first, skip, after, orderBy }

    if (query) {
      opArgs.where.OR = [
        { title_contains: query },
        { body_contains: query }
      ]
    }

    return prisma.query.posts(opArgs, info)
  },
  comments(parent, { first, skip, after, orderBy }, { prisma }, info) {
    return prisma.query.comments({ first, skip, after, orderBy }, info)
  },
  async post(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false)

    const [post] = await prisma.query.posts({
      where: {
        id,
        OR: [
          {
            published: true
          },
          {
            author: {
              id: userId
            }
          }
        ]
      }
    }, info)

    if (!post) {
      throw new Error('Post not found!')
    }

    return post
  }
}

export default Query
