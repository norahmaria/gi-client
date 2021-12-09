import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { imageToBase64 } from '../../../utils/imageToBase64'
import UserContext from '../../../context/User'
import PostsContext from '../../../context/Posts'
import growTextArea from '../../../utils/growTextArea'

import { ReactComponent as PaperIcon } from '../../../assets/post/Paperplane.svg'
import { ReactComponent as CloseIcon } from '../../../assets/Close.svg'
import { ReactComponent as ImageIcon } from '../../../assets/post/Image.svg'

const Create = () => {
  const [ post, setPost ] = useState({ content: '', media: '' })
  const [ emptyPost, setEmptyPost ] = useState(false)
  const [ focusOnInput, setFocusOnInput ] = useState(false)
  const { mutate, error } = useContext(PostsContext).useAdd()
  const { user } = useContext(UserContext)
  
  const publish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (post.content === '') {
      setEmptyPost(true)
    } else {
      mutate(post)
      setPost({ content: '', media: '' })
    }
  }

  return (
    <form className={`create ${post.media ? 'media' : ''}`} onSubmit={publish}>
      <h3 className="outliner">Create Post</h3>

      {post.media && (
        <div className="media-preview">
          <img src={post.media} alt="" />
        </div>
      )}

      <div className="toolbar">
        <div className="avatar-container">
        <Link to={`/u/${user?.username}`}>
          <img className="avatar" src={user?.avatar} alt="" />
        </Link>
        {(post.content !== '' || post.media !== '') && (
        <button 
          className="avatar cancel" 
          style={{ marginTop: '1rem' }}
          onClick={() => {
            setPost({ content: '', media: '' })
          }}>
          <CloseIcon />
        </button>
      )}
        </div>

        <textarea 
          style={{
            height: post.content === '' ? 'auto' : ''
          }}
          onKeyDown={growTextArea}
          value={post.content} 
          onChange={(e) => {
            setPost(prev => {
              return { ...prev, content: e.target.value }
            })
            setEmptyPost(prev => {
              if (prev) return e.target.value === ''
              return prev
            })
          }} 
          placeholder="What's up?" />

        <input 
          onFocus={() => setFocusOnInput(true)}
          onBlur={() => setFocusOnInput(false)}
          style={{
            position: 'absolute',
            top: '-30rem',
            left: '-30rem',
            opacity: '0'
          }}
          type="file" 
          name="media" 
          id="media"
          onChange={async (e) => {
            const { files } = e.target
            if (files && files[0]) {
              const media = await imageToBase64(files[0], false) as string
              setPost(prev => {
                return { ...prev, media }
              })
            }
          }}/>

        {!post.media ? (
          <label className={focusOnInput ? 'focus-media-btn' : ''} htmlFor="media"><ImageIcon/></label>
        ) : (
          <button 
            className="remove-media"
            onClick={(e) => {
              setPost(prev => {
                return { ...prev, media: '' }
              })
            }}><CloseIcon /></button>
        )}
        
        <button type="submit">
          <PaperIcon />
        </button>
      </div>

      {error && (
        <div className="error" style={{ marginTop: '1rem' }}>
          Something went wrong, try again later.
        </div>
      )}

      {emptyPost && (
        <div className="error" style={{ marginTop: '1rem' }}>
          You can't publish an empty post.
        </div>
      )}
    </form>
  )
}

export default Create