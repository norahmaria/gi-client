import { useInfiniteQuery } from 'react-query'
import { useContext, useState } from 'react'
import PostsContext from '../../context/Posts'
import API from '../../app/API'

const getCursorFeed = async (cursor: string) => {
  return await (await API.get(`/me/cursor/20/${cursor}`)).data
}

const useGetCursorFeed = () => {
  const { setPosts } = useContext(PostsContext)
  const [ cursor, setCursor ] = useState<string>('NaN')

  return useInfiniteQuery('feed', () => getCursorFeed(cursor), {
    keepPreviousData: true,
    getNextPageParam: ({ length }: any, pages) => {
      const max = Math.ceil(length / 10)
      const next = pages.length + 1
      return next <= max ? next : undefined
    },
    onSuccess: ({ pages }) => {
      console.log(pages)
      // const update = pages.flat().map(page => page.posts).flat()
      // setPosts(update)
    }
  })
}

export default useGetCursorFeed