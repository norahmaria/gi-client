import { useMutation } from 'react-query'
import type { setPostsType } from '../Posts'
import type PostType from '../../types/Post'
import API from '../../app/API'

const editPost = async (post: { content: string, id: string }) => {
  return await (await API.patch(`post/update/${post.id}`, post)).data as PostType
}

const useEditPost = (setPosts: setPostsType) => {
  return useMutation(editPost, {
    onSuccess: (update: PostType) => {
      setPosts((postsInState: PostType[]) => {
        const mutatableState = [...postsInState]
        return mutatableState.map(post => post._id === update._id ? update : post)
      })
    }
  })
}

export default useEditPost