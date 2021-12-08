import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import SocketContext from '../../context/Socket'
import UserContext from '../../context/User'

import Nav from '../../components/Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
import Post from '../Post/Post'
import Profile from '../Profile/Profile'
import Chats from '../../components/Chats/Chats'

const Base = () => {
  const socket = useContext(SocketContext)
  const { setOnline } = useContext(UserContext)

  useEffect(() => {
    socket.connect()

    socket.emit('online', {}, (online: string[]) => setOnline(online))
    socket.on('online/created', ({ userId }) => setOnline(prev => [userId, ...prev]))

    socket.on('online/removed', ({ userId }) => {
      setOnline(prev => {
        const mutable = [...prev]
        const index = mutable.indexOf(userId)
        if (index > -1) mutable.splice(index, 1)
        return mutable
      })
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected')
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  
  return (
    <div className="base">
      <Nav />
      
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        {/* <Route path="/u/:username" render={(props) => (
          <Profile key={props.match.params.username} {...props} />
        )}/> */}

        <Route path="/u/:username" element={ <Profile /> }/>
        <Route path="/p/:id" element={ <Post /> } />
      </Routes>

      <Chats />
    </div>
  )
}

export default Base