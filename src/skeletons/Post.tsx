import './Post.scss'

const Post = () => {
  return (
    <div className="post skeleton">
      <div className="creator">
        <div className="avatar"></div>

        <div className="text">
          <div className="skeleton-h3"></div>
          <div className="skeleton-p"></div>
        </div>
      </div>

      <div className="content">
        <div className="skeleton-content"></div>
        <div className="skeleton-content" style={{ width: '40%' }}></div>
        <div className="skeleton-content" style={{ width: '55%' }}></div>
      </div>
    </div>
  )
}

export default Post