import type User from './User'

type Comment = {
  creator: User,
  createdAt: Date,
  content: string,
  _id: string
}

export default Comment