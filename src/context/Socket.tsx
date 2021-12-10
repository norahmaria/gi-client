import type Children from '../types/Children'
import { createContext } from 'react'
import { io } from 'socket.io-client'
import env from 'dotenv'

// TODO: Add error handling for sockets

env.config()
const socket = io(process.env.REACT_APP_API || 'http://localhost:5005/', {
  withCredentials: true,
  transports: ['websocket']
}) 

const SocketContext = createContext(socket)

export const SocketProvider = ({ children }: Children) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext