import type { Socket } from 'socket.io-client'
import type { setChatsType } from '../Chats'
import type ChatType from '../../types/Chat'

type Types = {
  setChats: setChatsType,
  open: (id: string) => void,
  socket: Socket
  id: string,
}

const useAdd = ({ setChats, open, socket, id }: Types) => {
  socket.emit('chat/create', { startChatWith: id }, (chat: ChatType) => {
    setChats(chats => {
      const mutatable = [...chats]
      const index = mutatable.findIndex(({ _id }) => _id === chat._id)

      if (index <= -1) mutatable.unshift(chat)
      
      open(chat._id)
      return mutatable.map(existing => existing._id === chat._id ? chat : existing)
    })
  })
}

export default useAdd