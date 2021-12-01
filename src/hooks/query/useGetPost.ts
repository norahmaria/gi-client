import { useMutation } from 'react-query'
import type { Dispatch, SetStateAction } from 'react'
import type PostType from '../../types/Post'
import API from '../../app/API'

import { useContext } from 'react'
import PostsContext from '../../context/Posts'

const getPost = async (id: string) => {
  return await (await API.get(`/post/get/${id}`)).data
}

const useGetPost = (setIsInState: Dispatch<SetStateAction<boolean>>) => {
  const { setPosts } = useContext(PostsContext)
  
  return useMutation(getPost, {
    onSuccess: (post: PostType) => {
      setPosts(prev => {
        const exists = prev.some(inState => inState._id === post._id)
        return exists ? prev : [post, ...prev]
      })
      setIsInState(true)
    }
  })
}

export default useGetPost