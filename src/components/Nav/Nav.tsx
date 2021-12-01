import { useState } from 'react'
import Search from './Search/Search'
import Notifications from './Notifications/Notifications'
import Chats from './Chats/Chats'
import User from './User/User'
import { Link } from 'react-router-dom'

export type Types = {
  open: 'notifications' | 'chats' | 'user' | null,
  setOpen: React.Dispatch<React.SetStateAction<'notifications' | 'chats' | 'user' | null>>
}

const Nav = () => {
  const [ open, setOpen ] = useState<'notifications' | 'chats' | 'user' | null>(null)

  return (
    <header>
      <Link to="/" className="logo">Gi</Link>

      
      <nav>
        <h2 className="outliner">Navigation</h2>
        <Search />
        <Notifications open={open} setOpen={setOpen} />
        <Chats open={open} setOpen={setOpen} />
        <User open={open} setOpen={setOpen} />
      </nav>
    </header>
  )
}

export default Nav