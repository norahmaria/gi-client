import { useInfiniteQuery } from 'react-query'
import { useContext, useState } from 'react'
import PostsContext from '../../context/Posts'
import API from '../../app/API'

const getFeed = async (page: number, cursor: string | null) => {
  return await (await API.get(`/me/feed/${page}/${cursor && cursor}`)).data
}

const useGetFeed = () => {
  const { setPosts, posts } = useContext(PostsContext)
  const [ cursor, setCursor ] = useState<null | string>(null)

  return useInfiniteQuery('feed', ({ pageParam = 0 }) => getFeed(pageParam, cursor), {
    keepPreviousData: true,
    getNextPageParam: ({ length }: any, pages) => {
      const max = Math.ceil(length / 10)
      const next = pages.length + 1
      return next <= max ? next : undefined
    },
    onSuccess: ({ pages }) => {
      const update = pages.flat().map(page => page.posts).flat()
      // setCursor(update[0]._id)
      setPosts(update)
    }
  })
}

export default useGetFeed