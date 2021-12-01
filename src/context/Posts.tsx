import { useState, createContext } from 'react'
import type { UseMutationResult } from 'react-query'
import type Children from '../types/Children'
import type PostType from '../types/Post'

import useAddPost from './posts/add'
import useRemovePost from './posts/remove'
import useEditPost from './posts/edit'
import updatePost from './posts/update'

export type setPostsType = React.Dispatch<React.SetStateAction<PostType[] | []>>

type Context = {
  posts: PostType[],
  setPosts: setPostsType,
  useAdd: () => UseMutationResult<PostType, unknown, { content: string; media: string; }, unknown>
  useRemove: () => UseMutationResult<{ id: string; }, unknown, string, unknown>
  useEdit: () => UseMutationResult<PostType, unknown, { content: string; id: string; }, unknown>,
  updatePost: (postUpdate: PostType) => void
}

const PostsContext = createContext<Context>({} as Context)

export const PostsProvider = ({ children }: Children) => {
  const [posts, setPosts] = useState<PostType[]>([])

  const value = {
    posts, setPosts,
    useAdd: () => useAddPost(setPosts),
    useRemove: () => useRemovePost(setPosts),
    useEdit: () => useEditPost(setPosts),
    updatePost: (postUpdate: PostType) => updatePost(setPosts, postUpdate)
  }

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContext