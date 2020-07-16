const users = [
  { id: 'u-0001', name: 'Hao Chang', email: 'hao@abc.com', age: 34 },
  { id: 'u-0002', name: 'Xinyue Duan', email: 'yue@abc.com' }
]

// Demo post data
const posts = [
  { id: 'p-0001', title: 'Post 1', body: 'Post 1 body.', published: true, author: 'u-0001' },
  { id: 'p-0002', title: 'Post 2', body: 'Post 2 body.', published: false, author: 'u-0002' },
  { id: 'p-0003', title: 'Post 3', body: 'Post 3 body.', published: true, author: 'u-0002' }
]

// Demo comment data
const comments = [
  { id: 'c-0001', text: 'Comment 1', author: 'u-0001', post: 'p-0003' },
  { id: 'c-0002', text: 'Comment 2', author: 'u-0002', post: 'p-0001' },
  { id: 'c-0003', text: 'Comment 3', author: 'u-0001', post: 'p-0002' }
]

const db = { users, posts, comments }

export default db
