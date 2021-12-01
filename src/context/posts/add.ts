import { useMutation } from 'react-query'
import type { setPostsType } from '../Posts'
import type PostType from '../../types/Post'
import API from '../../app/API'

const addPost = async (post: { content: string, media: string }) => {
  return await (await API.post(`/post/create`, { post })).data
}

const useAddPost = (setPosts: setPostsType) => {
  return useMutation(addPost, {
    onSuccess: (post: PostType) => {
      setPosts((postsInState: PostType[]) => {
        const mutate = [...postsInState]
        mutate.unshift(post)
        return mutate
      })
    }
  })
}

export default useAddPost