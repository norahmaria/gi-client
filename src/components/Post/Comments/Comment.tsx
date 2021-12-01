import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CommentType from '../../../types/Comment'
import UserContext from '../../../context/User'
import useDeleteComment from '../../../hooks/mutation/useDeleteComment'
import toRelativeTime from '../../../utils/toRelativeTime'
import { ReactComponent as DeleteIcon } from '../../../assets/Delete.svg'

const Comment = ({ comment, postId, newComment }: { comment: CommentType, postId: string, newComment?: boolean }) => {
  const { _id, creator, content, createdAt } = comment
  const { username, avatar } = creator
  const { user, online } = useContext(UserContext)
  const { mutate: deleteComment } = useDeleteComment()

  return (
    <div className="comment" key={_id}>

      <Link to={`/u/${username}`} className="avatar-container">
        <img className="avatar small" src={avatar} alt="" />
        {online.includes(creator._id) && <div className="dot"></div>}
      </Link>

      <div className="comment-text">
        <div className="content">
          <Link to={`/u/${username}`}>
            <h5>{username}</h5>
          </Link>

          {content}
        </div>

        <p>
          {!newComment && comment.creator.username === user?.username && (
            <button className="delete-btn" onClick={e => {
              e.preventDefault()
              deleteComment({ postId, id: _id })
            }}>
              <DeleteIcon />
            </button>
          )}
          {toRelativeTime(createdAt, true)} {toRelativeTime(createdAt, true) !== 'Now' ? 'ago' : ''}
        </p>
        
      </div>
    </div>
  )
}

export default Comment