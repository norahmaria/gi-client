import { useContext } from 'react'
import ChatsContext from '../../../context/Chats'
import UserContext from '../../../context/User'
import useGetChats from '../../../hooks/query/useGetChats'
import InfiniteScroll from '../../InfiniteScroll'
import useSearch from '../../../hooks/useSearch'
import toRelativeTime from '../../../utils/toRelativeTime'

const Open = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<"notifications" | "chats" | "user" | null>>}) => {
  const { user, online } = useContext(UserContext)
  const { chats, open, add } = useContext(ChatsContext)
  const { isLoading, fetchNextPage, hasNextPage, error } = useGetChats()
  const { searchTerm, search, searchResults } = useSearch(true)

  return (
    <InfiniteScroll
      className="open-chats"
      isLoading={isLoading} 
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}>

      <h3>{searchTerm && 'Start'} Chat{!searchTerm && 's'}</h3>

      <input 
        className="search"
        placeholder="Search mutuals.."
        value={searchTerm}
        onChange={search}
        type="text" />

      {isLoading ? (
        <div className="preview"><h4>Loading..</h4></div>
      ) : error ? (
        <div className="preview error"><h4>Something went wrong, try again later.</h4></div>
      ) : <></>}

      {!isLoading && !searchTerm && chats && chats.sort((prev, next) => {
        if (!prev?.latestMessage || !next?.latestMessage) return 0
        if (prev.latestMessage.createdAt < next.latestMessage.createdAt) return 1
        if (prev.latestMessage.createdAt > next.latestMessage.createdAt) return -1
        return 0
      }).map(chat => {
        const { avatar, username, _id } = chat.users.filter(userInChat => userInChat._id !== user?._id)[0]
        const unread = chat.latestMessage && chat.latestMessage.sender._id !== user?._id && chat.latestMessage.read === false

        return (
          <div 
            onClick={e => {
              open(chat._id)
              setOpen(null)
            }}
            className="preview" 
            key={chat._id}>

            <div className="avatar-container">
              <img className="avatar" src={avatar} alt="" />
              {online.includes(_id) && <div className="dot"></div>}
            </div>
            <div className="text">
              <h4>{username}</h4>

              <div className="last-message">
                {chat.latestMessage ? (
                  <>
                  <p>{chat.latestMessage.message.substring(0, 12).trim()}..</p> •
                  <p>{toRelativeTime(chat.latestMessage.createdAt, true)}</p>
                  </>
                ) : <p>Start of chat</p>}
              </div>

              {unread && <div className="unread"></div>}
            </div>
            
          </div>
        )
      })}

      {searchTerm && !searchResults[0] && (
        <div className="preview"><h4>No results</h4></div>
      )}

      {searchTerm && searchResults && searchResults.map(user => {
        return (
          <div 
            key={`${user._id}-search-chat`}
            onClick={e => {
              add(open, user._id)
              setOpen(null)
            }}
            className="preview">

            <div className="avatar-container">
              <img className="avatar" src={user.avatar} alt="" />
              {online.includes(user._id) && <div className="dot"></div>}
            </div>

            <div className="text">
              <h4>{user.username}</h4>
            </div>
          </div>
        )
      })}
      
    </InfiniteScroll>
  )
}

export default Open