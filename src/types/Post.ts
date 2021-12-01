import type User from './User'
import type Comment from './Comment'

type Post = {
  creator: User,
  createdAt: string,
  reactions: {
    angry: string[],
    cry: string[],
    heart: string[],
    laugh: string[]
  },
  comments: [Comment],
  content: string,
  media: string,
  _id: string
}

export default Post