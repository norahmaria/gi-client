import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Types } from '../Nav'
import SignOut from '../../../sign/Out'
import UserContext from '../../../context/User'
import useOutsideClick from '../../../hooks/useOutsideClick'
import useDeleteUser from '../../../hooks/mutation/user/useDeleteUser'

const User = ({ open, setOpen }: Types) => {
  const { user } = useContext(UserContext)
  const container = useRef<HTMLDivElement>(null)
  // const { mutate: remove } = useDeleteUser()

  useOutsideClick(container, '.click-user', () => {
    setOpen(alreadyOpen => {
      if (alreadyOpen === 'user') return null
      return alreadyOpen
    })
  })

  const onClick = () => {
    setOpen(alreadyOpen => {
      return alreadyOpen === 'user' ? null : 'user'
    })
  }

  return (
    <div className="nav-user" ref={container}>
      <div onClick={onClick} onKeyPress={e => {
        if (e.key === 'Enter') onClick()
      }} tabIndex={0} className="click-user">
        <img className="avatar small" src={user?.avatar} alt="" />
      </div>

      {open === 'user' && (
        <div className="open-user">
          <Link onClick={e => setOpen(null)} to={`/u/${user?.username}`}>
            @{user?.username}
          </Link>
          <SignOut />
          {/* <button className="delete" onClick={() => remove()}>
            Delete Account
          </button> */}
        </div>
      )}
    </div>
  )
}

export default User