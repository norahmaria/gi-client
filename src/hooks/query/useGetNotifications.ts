import { useInfiniteQuery } from 'react-query'
import { useContext } from 'react'
import NotificationsContext from '../../context/Notifications'
import API from '../../app/API'

const getNotifications =  async (page: number) => {
  return await (await API.get(`/me/notifications/${page}`)).data
}

const useGetNotifications = () => {
  const { setNotifications } = useContext(NotificationsContext)

  return useInfiniteQuery('notifications', ({ pageParam = 0 }) => getNotifications(pageParam), {
    getNextPageParam: ({ length }: any, pages) => {
      const max = Math.ceil(length / 10)
      const next = pages.length + 1
      return next <= max ? next : undefined
    },
    onSuccess: ({ pages }) => {
      const update = pages.flat().map(page => page.notifications).flat()
      setNotifications(update)
    }
  })
}

export default useGetNotifications