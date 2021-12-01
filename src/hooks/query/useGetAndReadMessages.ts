import { useInfiniteQuery } from 'react-query'
import type Message from '../../types/Message'
import API from '../../app/API'

const getAndReadMessages = async (chatId: string, pageParam: number) => {
  return await (await API.post(`/messages/get/${chatId}/${pageParam}`, { chatId })).data as Message[]
}

const useGetAndReadMessages = (chatId: string, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  return useInfiniteQuery(['messages', chatId], ({ pageParam = 0 }) => getAndReadMessages(chatId, pageParam), ({
    getNextPageParam: ({ length }: any, pages) => {
      const max = Math.ceil(length / 20)
      const next = pages.length + 1
      return next <= max ? next : undefined
    },
    onSuccess: ({ pages }) => {
      const update = pages.flat().map(page => page.messages).flat()

      setMessages(prev => {
        const existing = prev.filter((message, index, array) => {
          return array.findIndex(({ _id }) => (_id === message._id)) === index
        })

        const combination = [...existing, ...update]

        return combination.filter((message, index, array) => {
          return array.findIndex(({ _id }) => (_id === message._id)) === index
        })
      })
    }
  }))
}

export default useGetAndReadMessages