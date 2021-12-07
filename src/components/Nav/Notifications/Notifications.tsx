import type { Types } from '../Nav'
import { useContext, useState, useEffect, useRef } from 'react'
import { ReactComponent as NotificationsIcon } from '../../../assets/nav/Notification.svg'
import SocketContext from '../../../context/Socket'
import NotificationsContext from '../../../context/Notifications'
import useGetNotifications from '../../../hooks/query/useGetNotifications'
import useOutsideClick from '../../../hooks/useOutsideClick'
import Previews from './Previews'

const Notifications = ({ open, setOpen }: Types) => {
  const socket = useContext(SocketContext)
  const { notifications } = useContext(NotificationsContext)
  const [ unread, setUnread ] = useState(false)
  const { refetch } = useGetNotifications()
  const container = useRef<HTMLDivElement>(null)

  useOutsideClick(container, '.notif-icon', () => {
    setOpen(alreadyOpen => {
      if (alreadyOpen === 'notifications') return null
      return alreadyOpen
    })
  })

  const onClick = () => {
    setOpen(alreadyOpen => {
      return alreadyOpen === 'notifications' ? null : 'notifications'
    })
  }

  useEffect(() => {
    socket.on('notification/created', refetch)
  }, [])

  useEffect(() => {
    if (notifications.some(prop => prop?.seen === false)) setUnread(true)
    if (open === 'notifications') setUnread(false)
  }, [notifications])

  return (
    <div className="nav-notifications" ref={container}>
      <div onClick={onClick} onKeyPress={e => {
        if (e.key === 'Enter') onClick()
      }} tabIndex={0} className="click-notifications">
        <NotificationsIcon className="notif-icon" /> {unread && <div className="dot small"></div>}
      </div>

      {open === 'notifications' && (
        <Previews setOpen={setOpen} notifications={notifications}/>
      )}
    </div>
  )
}

export default Notifications