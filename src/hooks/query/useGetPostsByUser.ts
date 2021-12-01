import { useInfiniteQuery } from 'react-query'
import { useContext } from 'react'
import PostsContext from '../../context/Posts'
import API from '../../app/API'

type Types = {
  pageParam: number,
  username: string
}

const getPostsByUser = async ({ pageParam, username }: Types) => {
  return await (await API.get(`/user/posts/${username}/${pageParam}`)).data
}

const useGetPostsByUser = (username: string) => {
  const { setPosts } = useContext(PostsContext)

  return useInfiniteQuery(['feed'], ({ pageParam = 0 }) => getPostsByUser({ pageParam, username }), {
    getNextPageParam: ({ length }: any, pages) => {
      const max = Math.ceil(length / 10)
      const next = pages.length + 1
      return next <= max ? next : undefined
    },
    onSuccess: ({ pages }) => {
      const update = pages.flat().map(page => page.posts).flat()
      setPosts(update)
    }
  })
}

export default useGetPostsByUser