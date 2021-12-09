import { useContext } from 'react'
import type PostType from '../../types/Post'
import InfiniteScroll from '../../components/InfiniteScroll'
import PostsContext from '../../context/Posts'
import useGetFeed from '../../hooks/query/useGetFeed'
import PostSkeleton from '../../skeletons/Post'
import Error from '../../components/Error'

import Create from '../../components/Post/Create/Create'
import Post from '../../components/Post/Post'

const Dashboard = () => {
  const { isLoading, hasNextPage, fetchNextPage, error } = useGetFeed()
  const { posts } = useContext(PostsContext)

  return (
    <main className="dashboard">
      <h2 className="outliner">Feed</h2>

      <Create />

      {error && (
        <>
          <Error message="An error occurred, please try again later."/>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {isLoading && !error && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      <InfiniteScroll 
        className="posts" 
        byWindow={true} 
        hasNextPage={hasNextPage} 
        isLoading={isLoading} 
        fetchNextPage={fetchNextPage} >
{/* 
        {posts && posts.map((post: PostType) => (
          <Post key={post._id} post={post} />
        ))} */}

        {posts && posts.map((post: PostType) => {
          if (post && post._id) return (
            <Post key={post._id} post={post} />
          )
        })}
        
      </InfiniteScroll>
    </main>
  )
}

export default Dashboard