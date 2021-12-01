import { useContext, useState, useEffect } from 'react'
import UserContext from '../context/User'
import SocketContext from '../context/Socket'
import UserType from '../types/User'
import useUnfollow from './mutation/user/useUnfollow'

const useFollowing = (profile: UserType) => {
  const socket = useContext(SocketContext)
  const { user, setUser } = useContext(UserContext)
  const { mutate } = useUnfollow()

  const [ isFollowing, setIsFollowing ] = useState(false)
  const [ mutuals, setMutuals ] = useState(false)

  useEffect(() => {
    const followed = profile?.following.findIndex(id => id === user?._id) !== -1
    const following = user?.following.findIndex(id => id === profile._id) !== -1

    setIsFollowing(following)
    setMutuals(following && followed)
  }, [profile, user])

  const follow = () => {
    socket.emit('follow', { toFollow: profile._id }, (updatedUser: UserType) => {
      setIsFollowing(updatedUser.following.includes(profile._id))
      setUser(updatedUser)
    })
  }

  const unfollow = () => mutate(profile._id)

  return { isFollowing, mutuals, unfollow, follow }
}

export default useFollowing