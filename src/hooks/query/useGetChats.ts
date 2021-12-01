import { useInfiniteQuery } from 'react-query'
import { useContext } from 'react'
import ChatsContext from '../../context/Chats'
import API from '../../app/API'

const getChats = async (page: number) => {
  return await (await API.get(`/me/chats/${page}`)).data
}

const useGetChats = () => {
  const { setChats } = useContext(ChatsContext)

  return useInfiniteQuery('chats', ({ pageParam = 0 }) => getChats(pageParam), {
    getNextPageParam: ({ length }: any, pages) => {
      const max = Math.ceil(length / 10)
      const next = pages.length + 1
      return next <= max ? next : undefined
    },
    onSuccess: ({ pages }) => {
      const update = pages.flat().map(page => page.chats).flat()
      setChats(update)
    }
  })
}

export default useGetChats