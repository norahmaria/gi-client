import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import SocketContext from '../../context/Socket'
import UserContext from '../../context/User'
import useGetMe from '../../hooks/query/useGetMe'

import Nav from '../../components/Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
import Post from '../Post/Post'
import Profile from '../Profile/Profile'
import Chats from '../../components/Chats/Chats'
import NotificationsContext from '../../context/Notifications'
import ChatsContext from '../../context/Chats'

const Base = () => {
  const socket = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { setOnline } = useContext(UserContext)
  const { notifications } = useContext(NotificationsContext)
  const { chats } = useContext(ChatsContext) 
  const [ titleNumber, setTitleNumber ] = useState(0)

  useGetMe()

  useEffect(() => {
    setTitleNumber(prev => {
      const newNotifications = notifications.filter((notif) => notif?.seen === false).length
      const newChats = chats.filter((chat) => chat?.latestMessage?.read === false && chat?.latestMessage?.sender?._id !== user?._id).length

      return newNotifications + newChats
    })
  }, [notifications, chats, user?._id])

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
      // add disconnect features
    })

    return () => {
      socket.off('online/created')
      socket.off('online/removed')
      socket.disconnect()
    }
  }, [socket])
  
  return (
    <HelmetProvider>
    <div className="base">
      <Helmet>
        <title>Gi {titleNumber > 0 ? `(${titleNumber})` : ''}</title>
      </Helmet>

      <Nav />
      
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/u/:username" element={ <Profile /> }/>
        <Route path="/p/:id" element={ <Post /> } />
      </Routes>

      <Chats />
    </div>
    </HelmetProvider>
  )
}

export default Base