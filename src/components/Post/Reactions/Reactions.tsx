import { useContext } from 'react'
import { Link } from 'react-router-dom'
import type PostType from '../../../types/Post'
import UserContext from '../../../context/User'
import SocketContext from '../../../context/Socket'
import PostsContext from '../../../context/Posts'
import UserType from '../../../types/User'
import Tooltip from '../../Tooltip'

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
  const { updatePost, setPosts } = useContext(PostsContext)
  const socket = useContext(SocketContext)

  const react = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, reaction: 'angry' | 'cry' | 'heart' | 'laugh') => {
    e.preventDefault()
    
    if (user?._id) {
      const angryIndex = post.reactions.angry.indexOf(user._id)
      const laughIndex = post.reactions.laugh.indexOf(user._id)
      const cryIndex = post.reactions.cry.indexOf(user._id)
      const heartIndex = post.reactions.heart.indexOf(user._id)

      setPosts(posts => {
        const mutable = [...posts]
        const index = posts.findIndex(({ _id }) => _id === post._id)

        if (angryIndex > -1 || laughIndex > -1 || cryIndex > -1 || heartIndex > -1) {
          if (angryIndex > -1) {
            mutable[index].reactions.angry.splice(angryIndex, 1)
          } else if (laughIndex > -1) {
            mutable[index].reactions.laugh.splice(laughIndex, 1)
          } else if (cryIndex > -1) {
            mutable[index].reactions.cry.splice(cryIndex, 1)
          } else if (heartIndex > -1) {
            mutable[index].reactions.heart.splice(heartIndex, 1)
          }
        }

        return mutable
      })
    }

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
        <Tooltip key={type} delay={300} direction="top" content={length.toString()}>
          <button 
          onClick={e => react(e, type)}
          className={`${type} ${reacted ? 'reacted' : ''}`}>
            <Icon className={type} />
          </button>
        </Tooltip>
      ))}
      <b>{elements.map(({ length }) => length).reduce((prev, next) => prev + next, 0)}</b>
      <Link to={`/p/${_id}`} className="comment-count">
        {post.comments.length} <CommentIcon className="comment-icon" />
      </Link>
    </div>
  )
}

export default Reactions