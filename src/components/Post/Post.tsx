import { useContext } from 'react'
import { Link } from 'react-router-dom'
import type PostType from '../../types/Post'
import toRelativeTime from '../../utils/toRelativeTime'
import UserContext from '../../context/User'
import Controls from './Controls/Controls'
import Reactions from './Reactions/Reactions'
import Comments from './Comments/Comments'

const Post = ({ post }: { post: PostType }) => {
  const { user, online } = useContext(UserContext)
  const { content, media, creator, createdAt, _id } = post

  return (
    <div className={`post ${media !== '' && 'media'}`}>
      {media !== '' && (
        <div className="media-content">
          <img src={media} alt="" />
        </div>
      )}

      <div className="creator">
        <Link className="avatar-container" to={`/u/${creator.username}`}>
          <img className="avatar medium" src={creator.avatar} alt="" />
          {online.includes(creator._id) && <div className="dot"></div>}
        </Link>

        
        <div className="text">
          <Link to={`/u/${creator.username}`}>
            <h3>{creator.username}</h3>
          </Link>
          <Link to={`/p/${_id}`}>
            <p>{toRelativeTime(post.createdAt)}</p>
          </Link>
        </div>

        {user && user.username === creator.username && (
          <Controls post={post} />
        )}
      </div>

      <div className="content">
        {content}
      </div>

      <div className="interactions">
        <Reactions post={post} />
        <Comments post={post} />
      </div>
    </div>
  )
}

export default Post