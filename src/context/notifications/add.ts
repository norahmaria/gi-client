import { useContext } from 'react'
import type { setNotificationsType } from '../Notifications'
import type NotificationType from '../../types/Notification'
import SocketContext from '../../context/Socket'

const useAdd = (setNotifications: setNotificationsType) => {
  const socket = useContext(SocketContext)

  socket.on('notification', (notification: NotificationType) => {
    setNotifications(notifications => [notification, ...notifications])
  })
}

export default useAdd