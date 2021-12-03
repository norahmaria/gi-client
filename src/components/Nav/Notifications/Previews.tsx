import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import useGetNotifications from '../../../hooks/query/useGetNotifications'
import InfiniteScroll from '../../InfiniteScroll'
import NotificationType from '../../../types/Notification'
import useSeenNotifications from '../../../hooks/mutation/useSeenNotifications'
import useReadNotification from '../../../hooks/mutation/useReadNotification'
import UserContext from '../../../context/User'

const Previews = ({ notifications, setOpen }: { notifications: NotificationType[], setOpen: React.Dispatch<React.SetStateAction<"notifications" | "chats" | "user" | null>> }) => {
  const { isLoading, error, fetchNextPage, hasNextPage } = useGetNotifications()
  const { mutate: setSeen } = useSeenNotifications()
  const { mutate: read } = useReadNotification()
  const { online } = useContext(UserContext)

  useEffect(() => {
    setSeen()
  }, [])

  return (
    <InfiniteScroll
      className="open-notifications"
      isLoading={isLoading} 
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}>

    <h3>Notifications</h3>

    {isLoading ? (
        <div className="preview"><h4>Loading..</h4></div>
      ) : error ? (
        <div className="preview error"><h4>Something went wrong, try again later.</h4></div>
      ) : <></>}

    {!isLoading && notifications && notifications.map(notif => {
      const { avatar, username } = notif.sender
      const message = notif.type === 'reaction' ? 'reacted to your post' : notif.type === 'comment' ? 'commented on your post' : 'followed you'

      return (
      <Link 
        to={`${notif.type === 'follow' ? `/u/${notif.sender.username}` : `/p/${notif.postId}`}`}
        onClick={(e) => {
          read(notif._id)
          setOpen(null)
        }}
        className={`preview read-${notif.read}`}
        key={notif._id}>

          <div className="avatar-container">
            <img className="avatar" src={avatar} alt="" />
            {online.includes(notif.sender._id) && <div className="dot"></div>}
          </div>
          <div>
            <b>{username}</b> {message}
          </div>
        
        {!notif.read && <div className="new"></div>}
      </Link>

      )
    })}
    
    </InfiniteScroll>
  )
}

export default Previews