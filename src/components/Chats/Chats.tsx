import { useContext } from 'react'
import ChatsContext from '../../context/Chats'
import Chat from './Chat'

const Chats = () => {
  const { openChats } = useContext(ChatsContext)

  return (
    <div className="chats">
      {openChats.length && <h2 className="outliner">Open Chats</h2>}

      {openChats.map(chat => (
        <Chat key={chat._id} chat={chat}/>
      ))}
    </div>
  )
}

export default Chats