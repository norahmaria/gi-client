import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/User'

import Base from '../views/Base/Base'
import Sign from '../sign/Sign'

import { ChatsProvider } from '../context/Chats'
import { NotificationsProvider } from '../context/Notifications'
import { PostsProvider } from '../context/Posts'

import './App.scss'

const App = () => {
  const { user } = useContext(UserContext)
  const [ isLoggedin, setIsLoggedIn ] = useState(localStorage.getItem('loggedIn') === 'true')

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('loggedIn') === 'true')
  }, [user])

  if (!user && !isLoggedin) return <Sign />

  return (
    <NotificationsProvider>
    <ChatsProvider>
    <PostsProvider>
      <h1 className="outliner">Gi</h1>
      <Base />
    </PostsProvider>
    </ChatsProvider>
    </NotificationsProvider>
  )
}

export default App
