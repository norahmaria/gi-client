import { imageToBase64 } from '../../utils/imageToBase64'
import { useState, useEffect, useContext } from 'react'
import { ReactComponent as StarEyesIcon } from '../../assets/emoji/StarEyes.svg'
import { ReactComponent as CryIcon } from '../../assets/emoji/Cry.svg'
import { ReactComponent as CheckIcon } from '../../assets/Check.svg'

import useUpdateUser from '../../hooks/mutation/user/useUpdateUser'
import useFollowing from '../../hooks/useFollowing'
import UserContext from '../../context/User'
import ChatsContext from '../../context/Chats'
import type UserType from '../../types/User'

const User = ({ profile }: { profile: UserType }) => {
  const { user } = useContext(UserContext)
  const [ focusOnInput, setFocusOnInput ] = useState(false)
  const { add, open } = useContext(ChatsContext)
  const { username, avatar, followers, following } = profile
  const [ avatarUpdate, setAvatarUpdate ] = useState(profile.avatar)
  const [ openAvatarEditing, setOpenAvatarEditing ] = useState(false)
  const { isFollowing, mutuals, unfollow, follow } = useFollowing(profile)
  
  const { mutate: updateAvatar } = useUpdateUser()

  useEffect(() => {
    if (avatarUpdate === avatar || user?._id !== profile._id) setOpenAvatarEditing(false)
  }, [avatarUpdate, profile, user, avatar])

  useEffect(() => setAvatarUpdate(profile.avatar), [profile])

  return (
    <div className="card me">
      {user?._id === profile._id ? (
        <>
          <input 
            style={{
              position: 'absolute',
              left: '-30rem',
              top: '-30rem',
              opacity: 0
            }}
            type="file" 
            id="avatar"
            onFocus={() => setFocusOnInput(true)} 
            onBlur={() => setFocusOnInput(false)}
            onChange={async (e) => {
              const files = e.target.files
              let input = avatar
  
              if (!files) {
                setOpenAvatarEditing(false)
              } else {
                input = await imageToBase64(files[0], true) as string || avatar
              }
  
              setOpenAvatarEditing(true)
              setAvatarUpdate(input)
            }} />

          <label htmlFor="avatar" className={`avatar-container ${focusOnInput ? 'focus' : ''}`}>
            <img style={{ cursor: 'pointer' }} className="avatar" src={avatarUpdate} alt="" />
          </label>
        </>
      ) : (
        <img className="avatar" src={avatarUpdate} alt="" />
      )}

      {user?._id === profile._id && openAvatarEditing && (
        <button onClick={(e) => {
            if (openAvatarEditing) {
              e.preventDefault()
              updateAvatar(avatarUpdate)
              setOpenAvatarEditing(false)
            }
          }}
          className="avatar-save">
          <CheckIcon />
        </button>
      )}

      <div className="text">
        <div className="profile-controls">
          <h3>{username}</h3>
        </div>

        <div className="buttons">
          <button 
            className={`follow-btn following-${isFollowing}`}
            disabled={user?._id === profile._id} 
            onClick={() => isFollowing ? unfollow() : follow()}>
            {user?._id === profile._id ? <StarEyesIcon /> : isFollowing ? <StarEyesIcon /> : <CryIcon />}
            {followers.length} Followers
          </button>

          {user?._id !== profile._id && mutuals && (
            <button className="message-btn" onClick={() => add(open, profile._id)}>
              Message
            </button>
          )}

          <button disabled>
            Following {following.length}
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default User
