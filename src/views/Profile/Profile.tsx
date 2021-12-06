import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import type UserType from '../../types/User'
import PostsContext from '../../context/Posts'
import UserContext from '../../context/User'
import InfiniteScroll from '../../components/InfiniteScroll'
import useGetPostsByUser from '../../hooks/query/useGetPostsByUser'
import useGetProfile from '../../hooks/query/useGetProfile'
import Post from '../../components/Post/Post'
import User from './User'
import Error from '../../components/Error'
import PostSkeleton from '../../skeletons/Post'

const Profile = () => {
  const { username } = useParams() as { username: string }
  const { user } = useContext(UserContext)
  const [ profile, setProfile ] = useState<UserType | null>(null)
  
  const { posts } = useContext(PostsContext)
  const { mutate, error } = useGetProfile(setProfile)
  const { isLoading, fetchNextPage, hasNextPage } = useGetPostsByUser(username)

  useEffect(() => mutate(username), [username, user])

  return (
    <div className="profile">

      <InfiniteScroll
        className="posts"
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}>

        {error && (
          <>
            <Error message={(error as any)?.response?.data?.error && (error as any)?.response?.data?.error === 'No user by that name' ? 'No user by that name, sorry!' : 'An error occurred, please try again later.'}/>
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
          </>
        )}

        {isLoading && !error ? (
          <>
            <PostSkeleton/>
            <PostSkeleton/>
          </>
        ) : !user || !profile ? (
          <PostSkeleton/>
        ) : (
          <User profile={profile} />
        )}

        {!isLoading && profile && !posts[0] && (
          <div className="post">
            <b>@{profile.username}</b> has no posts yet</div>
        )}
        
        {posts && posts
          .filter(({ creator }) => creator.username === username)
          .map((post) => (
            <Post key={post._id} post={post} />
          )
        )}

      </InfiniteScroll>
    </div>
  )
}

export default Profile