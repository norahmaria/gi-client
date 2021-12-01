import type { Socket } from 'socket.io-client'
import type { setChatsType } from '../Chats'

type Types = {
  setOpenChats: setChatsType,
  socket: Socket,
  id: string
}

const useClose = ({ setOpenChats, socket, id }: Types) => {
  socket.emit('chat/leave', { chatId: id }, () => {
    setOpenChats(chats => {
      const mutable = [...chats]
      const index = mutable.findIndex(chat => chat._id === id)

      if (index !== -1) mutable.splice(index, 1)
      return mutable
    })
  })
}

export default useClose