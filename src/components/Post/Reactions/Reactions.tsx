import { useContext } from 'react'
import { Link } from 'react-router-dom'
import type PostType from '../../../types/Post'
import UserContext from '../../../context/User'
import SocketContext from '../../../context/Socket'
import PostsContext from '../../../context/Posts'
import UserType from '../../../types/User'

import { ReactComponent as CommentIcon } from '../../../assets/nav/Chat.svg'
import { ReactComponent as Angry } from '../../../assets/emoji/Angry.svg'
import { ReactComponent as Cry } from '../../../assets/emoji/Cry.svg'
import { ReactComponent as Heart } from '../../../assets/emoji/Heart.svg'
import { ReactComponent as Laugh } from '../../../assets/emoji/Laugh.svg'

type Elements = {
  type: 'angry' | 'cry' | 'heart' | 'laugh',
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined
  }>,
  length: number,
  reacted: boolean 
}

const Reactions = ({ post }: { post: PostType }) => {
  const { reactions, _id } = post
  const { user } = useContext(UserContext)
  const { updatePost } = useContext(PostsContext)
  const socket = useContext(SocketContext)

  const react = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, reaction: 'angry' | 'cry' | 'heart' | 'laugh') => {
    e.preventDefault()
    socket.emit('post/reaction', { reaction, postId: _id }, (postUpdate: PostType) => {
      updatePost(postUpdate)
    })
  }

  const elements: Elements[] = [{
    Icon: Angry, type: 'angry',
    length: reactions.angry.length,
    reacted: reactions.angry.includes((user as UserType)?._id)
  }, {
    Icon: Cry, type: 'cry',
    length: reactions.cry.length,
    reacted: reactions.cry.includes((user as UserType)?._id)
  }, {
    Icon: Heart, type: 'heart',
    length: reactions.heart.length,
    reacted: reactions.heart.includes((user as UserType)?._id)
  }, {
    Icon: Laugh, type: 'laugh',
    length: reactions.laugh.length,
    reacted: reactions.laugh.includes((user as UserType)?._id)
  }, ]

  return (
    <div className="reactions">
      {elements.map(({ Icon, type, length, reacted }) => (
        <button 
          key={type}
          onClick={e => react(e, type)}
          className={`${type} ${reacted ? 'reacted' : ''}`}>
          <Icon className={type} />
        </button>
      ))}
      <b>{elements.map(({ length }) => length).reduce((prev, next) => prev + next, 0)}</b>
      <Link to={`/p/${_id}`} className="comment-count">
        {post.comments.length} <CommentIcon className="comment-icon" />
      </Link>
    </div>
  )
}

export default Reactions