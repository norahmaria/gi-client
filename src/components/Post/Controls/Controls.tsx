import { useContext, useState } from 'react'
import PostsContext from '../../../context/Posts'
import PostType from '../../../types/Post'
import { ReactComponent as DotsIcon } from '../../../assets/Dots.svg'

const Controls = ({ post }: { post: PostType }) => {
  const { useRemove } = useContext(PostsContext)
  const { mutate: remove } = useRemove()
  const [ open, setOpen ] = useState(false)

  return (
    <div className="controls">
      <DotsIcon tabIndex={0} onKeyPress={(e) => {
        if (e.key === 'Enter') setOpen(prev => !prev)
      }} onClick={() => setOpen(prev => !prev)} />

      {open && (
        <div className="open-controls">
          <button onClick={e => {
            e.preventDefault()
            remove(post._id)
            setOpen(false)
          }}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Controls