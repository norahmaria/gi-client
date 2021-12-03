import type Children from '../types/Children'
import { createContext } from 'react'
import { io } from 'socket.io-client'

// TODO: Add error handling for sockets
// TODO: Set url back to heroku
// const socket = io('https://server-gi.herokuapp.com/', {
  //   withCredentials: true
  // }) 
  
const socket = io('http://localhost:5005/', {
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