import { gql } from 'apollo-boost'

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(
      data: $data
    ) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const login = gql`
  mutation($data: LoginInput!) {
    login(
      data: $data
    ) {
      token
    }
  }
`

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`

const myPosts = gql`
  query {
    myPosts {
      id
      title
      body
      published
    }
  }
`

const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(
      data: $data
    ) {
      id
      title
      body
      published
      author {
        id
      }
    }
  }
`

const updatePost = gql`
  mutation(
    $id: ID!
    $data: UpdatePostInput!
  ) {
    updatePost(
      id: $id
      data: $data
    ) {
      id
      title
      body
      published
    }
  }
`

const deletePost = gql`
  mutation($id: ID!) {
    deletePost(
      id: $id
    ) {
      id
    }
  }
`

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(
      id: $id
    ) {
      id
    }
  }
`

export {
  createUser,
  login,
  getUsers,
  getProfile,
  getPosts,
  myPosts,
  createPost,
  updatePost,
  deletePost,
  deleteComment
}
