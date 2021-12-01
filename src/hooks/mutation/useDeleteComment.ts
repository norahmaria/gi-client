import { useContext } from 'react'
import { useMutation } from 'react-query'
import type PostType from '../../types/Post'
import API from '../../app/API'
import PostsContext from '../../context/Posts'

const deleteComment = async ({ postId, id }: { postId: string, id: string }) => {
  return await (await API.delete(`/comments/delete/${postId}/${id}`)).data as { postId: string, id: string }
}

const useDeleteComment = () => {
  const { setPosts } = useContext(PostsContext)

  return useMutation(deleteComment, {
    onSuccess: ({ postId, id }: { postId: string, id: string }) => {
      setPosts((postsInState: PostType[]) => {
        const mutate = [...postsInState]
        const postIndex = mutate.findIndex(post => post._id === postId)

        if (postIndex > -1) {
          const commentIndex = mutate[postIndex].comments.findIndex(comment => {
            if (!comment || comment === undefined || !comment._id) return false
            return comment._id === id
          })
          if (commentIndex > -1) delete mutate[postIndex].comments[commentIndex]
        }

        return mutate
      })
    }
  })
}

export default useDeleteComment