import type Children from '../types/Children'
import { createContext } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://server-gi.herokuapp.com/', {
  withCredentials: true
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