import type User from './User'

type Message = {
  chatId: string,
  sender: User,
  createdAt: Date,
  read: boolean,
  message: string,
  _id: string
}

export default Message