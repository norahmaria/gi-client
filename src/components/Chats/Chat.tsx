import { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type ChatType from '../../types/Chat'
import type MessageType from '../../types/Message'
import ChatsContext from '../../context/Chats'
import UserContext from '../../context/User'
import SocketContext from '../../context/Socket'
import useGetAndReadMessages from '../../hooks/query/useGetAndReadMessages'
import InfiniteScroll from '../InfiniteScroll'
import growTextArea from '../../utils/growTextArea'
import useMessaging from '../../hooks/useMessaging'

import { ReactComponent as CloseIcon } from '../../assets/Close.svg'

const Chat = ({ chat }: { chat: ChatType }) => {
  const { close } = useContext(ChatsContext)
  const { user, online } = useContext(UserContext)
  const [ messages, setMessages ] = useState<MessageType[] | []>([])

  const dummy = useRef<HTMLDivElement>(null)
  const chatWith = chat.users.filter(({ _id }) => user?._id !== _id)[0]

  const { message, setMessage, sendMessage } = useMessaging(chat, user)
  const { isLoading, error, hasNextPage, fetchNextPage } = useGetAndReadMessages(chat._id, setMessages)

  const socket = useContext(SocketContext)

  useEffect(() => {
    (dummy.current as HTMLElement).scrollIntoView()
  }, [messages])

  useEffect(() => {
    socket.on('message/created', ({ messageDocument, chatId }) => {
      if (chatId === chat._id) {
        setMessages(prev => {
          const mutable = [...prev]
          mutable.push(messageDocument)
          return mutable
        })
      }
    })

    return () => { socket.off('message/created') }
  }, [])

  return (
    <div className="chat">
      <div className="chat-info">
        <div>
          <div className="avatar-container">
            <img className="avatar small" src={chatWith.avatar} alt="" />
            {online.includes(chatWith._id) && <div className="dot"></div>}
          </div>
          <Link to={`/u/${chatWith.username}`}>
            <h4>{chatWith.username}</h4>
          </Link>
        </div>
        <button className="close-btn" tabIndex={0} onClick={e => {
          e.preventDefault()
          close(chat._id)
        }}><CloseIcon /></button>
      </div>
      
      <InfiniteScroll
        reverse={true}
        className={`messages ${chat._id}`}
        isLoading={isLoading} 
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage} >

        {error && (
          <div className="error" style={{ marginBottom: '-0.75rem' }}>
            Something went wrong, try again later.
          </div>
        )}

        {messages.filter((message, index, array) => {
          return array.findIndex(({ _id }) => (_id === message._id)) === index
        }).map(message => {
          const isUser = message.sender._id === user?._id
      
          return (
            <div 
              className={`message-container user-${isUser}`} 
              key={message._id}>
              {!isUser && <img className="avatar mini" src={chatWith.avatar} alt="" />}
              <div className="message">
                {message.message}
              </div>
            </div>
          )
        })}
        <div ref={dummy} className="dummy"></div>

      </InfiniteScroll>

      <form onSubmit={sendMessage}>
        <textarea 
          onKeyDown={growTextArea} 
          value={message} 
          placeholder="Aa"
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage(e)
          }}
          onChange={({ target }) => setMessage(target.value)} />

        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat