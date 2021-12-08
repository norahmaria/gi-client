import { useContext, useState } from 'react'
import { ReactComponent as PaperIcon } from '../../../assets/post/Paperplane.svg'
import { useParams } from 'react-router-dom'
import type PostType from '../../../types/Post'
import type CommentType from '../../../types/Comment'
import SocketContext from '../../../context/Socket'
import PostsContext from '../../../context/Posts'
import Comment from './Comment'

// TODO: Add error notifications on comment upload and delete

const Comments = ({ post }: { post: PostType }) => {
  const { id } = useParams() as { id: string }
  const socket = useContext(SocketContext)
  const { setPosts } = useContext(PostsContext)
  const [ content, setContent ] = useState('')
  const [ newComments, setNewComments ] = useState<CommentType[]>([])
  
  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('post/comment', { content, postId: post._id }, 
    (comment: CommentType) => {
      setPosts(prev => {
        const mutable = [...prev]
        const index = mutable.findIndex(inStatePost => inStatePost._id === post._id)
        if (index > -1) mutable[0].comments.push(comment)
        return mutable
      })

      setNewComments(prev => {
        const mutable = [...prev]
        mutable.push(comment)
        return mutable
      })

      setContent('')
    })
  }

  return (
    <div className={`comments ${id !== undefined ? 'on-page' : 'in-feed'}`}>
      {id !== undefined && <h4 className="outliner">Comments</h4>}

      <form onSubmit={addComment}>
        <input 
          autoComplete="off"
          type="text" 
          name="comment" 
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Add a comment..." />
        <button type="submit"><PaperIcon /></button>
      </form>
      
      {newComments.map(comment => {
        const index = post.comments.map(({ _id }) => _id).indexOf(comment._id)
        if (index < 0 || id === undefined) return ( <Comment key={comment._id} comment={comment} postId={post._id} newComment={true} /> )
      })}

      {id !== undefined && (
        post.comments.map(comment => (
          <Comment key={comment._id} comment={comment} postId={post._id} />
        ))
      )}
    </div>
  )
}

export default Comments