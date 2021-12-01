import type { setPostsType } from '../Posts'
import type PostType from '../../types/Post'

const updatePost = (setPosts: setPostsType, postUpdate: PostType) => {
  setPosts((postsInState: PostType[]) => {
    const mutatableState = [...postsInState]
    return mutatableState.map(post => post._id === postUpdate._id ? postUpdate : post)
  })
}

export default updatePost