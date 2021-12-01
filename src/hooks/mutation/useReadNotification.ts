import { useMutation } from 'react-query'
import { useContext } from 'react'
import NotificationsContext from '../../context/Notifications'
import API from '../../app/API'

const readNotification = async (id: string) => {
  return await (await API.patch(`/notifications/open`, { id })).data
}

const useReadNotification = () => {
  const { setNotifications } = useContext(NotificationsContext)

  return useMutation(readNotification, {
    onSuccess: ({ notificationOpened: { _id } }) => {
      setNotifications(prev => {
        return prev.map(notif => notif._id === _id ? {...notif, read: true } : notif)
      })
    }
  })
}

export default useReadNotification