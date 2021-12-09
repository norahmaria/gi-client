import { useState, useContext, createContext, useEffect } from 'react'
import type Children from '../types/Children'
import type ChatType from '../types/Chat'
import SocketContext from '../context/Socket'

import add from './chats/add'
import close from './chats/close'
import open from './chats/open'

export type setChatsType = React.Dispatch<React.SetStateAction<ChatType[] | []>>

type Context = {
  chats: ChatType[] | [],
  setChats: setChatsType,
  openChats: ChatType[] | [],
  setOpenChats: setChatsType,
  add: (open: (id: string) => void, id: string) => void,
  close: (id: string) => void,
  open: (id: string) => void
}

const ChatsContext = createContext<Context>({} as Context)

export const ChatsProvider = ({ children }: Children) => {
  const [chats, setChats] = useState<ChatType[]>([])
  const [openChats, setOpenChats] = useState<ChatType[]>([])
  const socket = useContext(SocketContext)

  const value = {
    chats, setChats,
    openChats, setOpenChats,
    add: (open: (id: string) => void, id: string) => add({ setChats, open, socket, id }),
    close: (id: string) => close({ setOpenChats, socket, id }),
    open: (id: string) => open({ setOpenChats, socket, id })
  }

  useEffect(() => {
    const removeChatOnWindowSize = () => {
      if (window.innerWidth < 700) {
        setOpenChats(prev => {
          const mutable = [...prev]
          const first = mutable[0]
  
          if (first) return [first]
          return prev
        })
      }
    }

    window.addEventListener('resize', removeChatOnWindowSize)

    return () => {
      setChats([])
      setOpenChats([])
      window.removeEventListener('resize', removeChatOnWindowSize)
    }
  }, [])

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  )
}

export default ChatsContext