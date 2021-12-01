import type User from './User'

type Notification = {
  notify: User,
  sender: User,
  createdAt: Date,
  read: boolean,
  seen: boolean,
  postId: string,
  userId: string,
  type: 'reaction' | 'comment' | 'follow',
  _id: string
}

export default Notification