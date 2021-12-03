import type { Types } from '../Nav'
import { useState, useContext, useEffect, useRef } from 'react'
import { ReactComponent as ChatIcon } from '../../../assets/nav/Chat.svg'
import UserContext from '../../../context/User'
import SocketContext from '../../../context/Socket'
import ChatsContext from '../../../context/Chats'
import useGetChats from '../../../hooks/query/useGetChats'
import useOutsideClick from '../../../hooks/useOutsideClick'
import Open from './Open'

const Chats = ({ open: openState, setOpen }: Types) => {
  const [ unread, setUnread ] = useState(false)
  const { refetch } = useGetChats()
  const container = useRef<HTMLDivElement>(null)

  const socket = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { chats } = useContext(ChatsContext)

  useOutsideClick(container, '.chat-icon', () => {
    setOpen(alreadyOpen => {
      if (alreadyOpen === 'chats') return null
      return alreadyOpen
    })
  })

  useEffect(() => {
    socket.on('chat/update', () => {
      refetch()
    })
  }, [])
  
  useEffect(() => {
    const unreadMessage = chats.find(chat => chat.latestMessage?.read === false && chat.latestMessage?.sender._id !== user?._id)
    
    setUnread(unreadMessage ? true : false)
  }, [chats, user?._id])
  

  const onClick = () => {    
    setOpen(alreadyOpen => {
      return alreadyOpen === 'chats' ? null : 'chats'
    })
  }

  return (
    <div className="nav-chats" ref={container}>
      <div onClick={onClick} onKeyPress={e => {
        if (e.key === 'Enter') onClick()
      }} tabIndex={0} className="click-chats">
        <ChatIcon className="chat-icon" /> {unread && <div className="dot small"></div>}
      </div>

      {openState === 'chats' && <Open setOpen={setOpen}/>}
    </div>
  )
}

export default Chats