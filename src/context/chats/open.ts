import type { Socket } from 'socket.io-client'
import type { setChatsType } from '../Chats'
import type ChatType from '../../types/Chat'

type Types = {
  setOpenChats: setChatsType,
  socket: Socket,
  id: string
}

const useOpen = ({ setOpenChats, socket, id }: Types) => {
  socket.emit('chat/join', { chatId: id }, (chat: ChatType) => {
    setOpenChats(chats => {
      const index = chats.findIndex(chat => chat._id === id)

      if (chats.length >= 3) chats.splice(0, 1)
      if (index === -1) return [chat, ...chats]
      return chats
    })
  })
}

export default useOpen