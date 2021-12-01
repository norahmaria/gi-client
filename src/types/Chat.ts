import type Message from './Message'
import type User from './User'

type Chat = {
  users: User[],
  latestMessage: Message,
  initalizedBy: User,
  _id: string
}

export default Chat