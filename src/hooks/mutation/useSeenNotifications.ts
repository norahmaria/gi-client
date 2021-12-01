import { useMutation } from 'react-query'
import { useContext } from 'react'
import NotificationsContext from '../../context/Notifications'
import API from '../../app/API'

const seeNotifications = async () => {
  return await (await API.patch(`/notifications/seen`)).data
}

const useSeenNotifications = () => {
  const { setNotifications } = useContext(NotificationsContext)

  return useMutation(seeNotifications, {
    onSuccess: () => {
      setNotifications(prev => {
        return prev.map(notif => {
          return { ...notif, seen: true }
        })
      })
    }
  })
}

export default useSeenNotifications