import { useState, createContext, useEffect } from 'react'
import type Children from '../types/Children'
import type NotificationType from '../types/Notification'

import add from './notifications/add'

export type setNotificationsType = React.Dispatch<React.SetStateAction<NotificationType[]>>

type Context = {
  notifications: NotificationType[] | [],
  setNotifications: setNotificationsType,
  add: (setNotifications: setNotificationsType) => void
}

const NotificationsContext = createContext<Context>({} as Context)

export const NotificationsProvider = ({ children }: Children) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])

  const value = {
    notifications, setNotifications,
    add: () => add(setNotifications)
  }

  useEffect(() => {
    return () => {
      setNotifications([])
    }
  }, [])

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsContext