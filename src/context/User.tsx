import { useState, createContext } from 'react'
import type Children from '../types/Children'
import type UserType from '../types/User'

type Context = {
  user: UserType | null,
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  online: string[],
  setOnline: React.Dispatch<React.SetStateAction<string[]>>
}

const UserContext = createContext<Context>({} as Context)

export const UserProvider = ({ children }: Children) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [online, setOnline] = useState<string[]>([])
  
  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      online, 
      setOnline 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext