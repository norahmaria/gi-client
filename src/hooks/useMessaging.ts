import { useState, useContext } from 'react'
import SocketContext from '../context/Socket'
import type ChatType from '../types/Chat'
import type UserType from '../types/User'

const useMessages = ({ _id: chatId, users }: ChatType, user: UserType | null) => {
  const [ message, setMessage ] = useState('')
  const reciever = users.filter(inChat => inChat._id !== user?._id)[0]
  const socket = useContext(SocketContext)
  
  const sendMessage = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    socket.emit('message/create', { message, chatId, reciever }, () => setMessage(''))
  }

  return { message, setMessage, sendMessage }
}

export default useMessages