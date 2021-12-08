import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Post from '../../components/Post/Post'
import PostsContext from '../../context/Posts'
import useGetPost from '../../hooks/query/useGetPost'
import Error from '../../components/Error'
import PostSkeleton from '../../skeletons/Post'

const PostView = () => {
  const { id } = useParams() as { id: string }
  const { posts } = useContext(PostsContext)
  const [ index, setIndex ] = useState(posts.findIndex(({ _id }) => _id === id))
  const [ isInState, setIsInState ] = useState(false)

  const { mutate, error, isLoading } = useGetPost(setIsInState)

  useEffect(() => {
    setIndex(() => posts.findIndex(({ _id }) => _id === id))

    posts.findIndex(({ _id }) => _id === id) > -1 ? setIsInState(true) : mutate(id)
  }, [isInState, id, posts, mutate])

  return (
    <div className="dashboard">
      {error && (
        <>
          <Error message="An error occurred, please try again later."/>
          <PostSkeleton />
        </>
      )}
      {isLoading && !error && <PostSkeleton />}
      {!isLoading && isInState && <Post post={posts[index]} />}
      <br />
    </div>
  )
}

export default PostView