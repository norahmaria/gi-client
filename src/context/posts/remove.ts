import { useMutation } from 'react-query'
import type { setPostsType } from '../Posts'
import type PostType from '../../types/Post'
import API from '../../app/API'

const removePost = async (id: string) => {
  return await (await API.delete(`/post/delete/${id}`)).data as { id: string }
}

const useRemovePost = (setPosts: setPostsType) => {
  return useMutation(removePost, {
    onSuccess: ({ id }: { id: string }) => {
      setPosts((postsInState: PostType[]) => {
        const mutate = [...postsInState]
        const index = mutate.findIndex(post => post?._id === id)
  
        if (index > -1) delete mutate[index]
        return mutate
      })
    }
  })
}

export default useRemovePost