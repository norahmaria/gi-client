import { useContext } from 'react'
import UserContext from '../context/User'

import Base from '../views/Base/Base'
import Sign from '../sign/Sign'
import useGetMe from '../hooks/query/useGetMe'

import { ChatsProvider } from '../context/Chats'
import { NotificationsProvider } from '../context/Notifications'
import { PostsProvider } from '../context/Posts'

import './App.scss'

const App = () => {
  const { user } = useContext(UserContext)

  useGetMe()

  if (!user) return <Sign />

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
