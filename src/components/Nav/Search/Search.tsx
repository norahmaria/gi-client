import { useEffect, useContext, useState, useRef } from 'react'
import { ReactComponent as SearchIcon } from '../../../assets/Search.svg'
import { Link } from 'react-router-dom'
import UserContext from '../../../context/User'
import useSearch from '../../../hooks/useSearch'
import useOutsideClick from '../../../hooks/useOutsideClick'
import type UserType from '../../../types/User'

const Search = () => {
  const { searchTerm, setSearchTerm, search, searchResults, setSearchResults } = useSearch(false)
  const { user, online } = useContext(UserContext)
  const [ openSearch, setOpenSearch ] = useState(false)

  const input = useRef<HTMLInputElement>(null)
  const container = useRef<HTMLDivElement>(null)

  useOutsideClick(container, '.input', () => {
    setOpenSearch(false)
    setSearchTerm('')
  })

  useEffect(() => {
    setSearchResults(results => {
      return results.sort((prev, next) => {
        const mutualsFollowing = next.followers.filter(follower => user?.following.includes(follower))
        const prevMutualsFollowing = prev.followers.filter(follower => user?.following.includes(follower))
        
        if (prevMutualsFollowing > mutualsFollowing) return -1
        if (prevMutualsFollowing < mutualsFollowing) return 1
        return 0
      })
    })
  }, [searchResults, user?.following])

  return (
    <div className="nav-search" ref={container}>
      <div className="input">
        <SearchIcon 
          tabIndex={0} 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setOpenSearch(prev => !prev)
              if (input.current) input.current.focus()
            }
          }} 
          onClick={() => {
            setOpenSearch(prev => !prev)
            if (input.current) input.current.focus()
          }}/>
        <input 
          ref={input}
          autoComplete="off"
          id="search-input"
          style={{
            width: openSearch ? "9.25rem" : '0'
          }}
          onChange={search} 
          value={searchTerm} 
          type="text" 
          placeholder="Search.."/>
      </div>

      {searchTerm && openSearch && (
        <div className="open-search">
          {!searchResults.filter(result => result._id !== user?._id)[0] && (
            <div className="preview">
              <h3>No results</h3>
            </div>
          )}

          {searchResults && searchResults.filter(result => result._id !== user?._id).map(({ _id, username, avatar, followers }) => {
            const followersFromFollowing = followers.filter((follower: unknown) => user?.following.includes((follower as UserType)._id)) as unknown[] as UserType[]

            return (
              <Link className="preview" key={_id} onClick={e => setOpenSearch(false)} to={`/u/${username}`}>
              <div className="avatar-container">
                <img className="avatar" src={avatar} alt="" />
                {online.includes(_id) && <div className="dot"></div>}
              </div>
              <div className="text">
                <h3>{username}</h3>
                {followersFromFollowing[0] && (
                  <p>Followed by <b>{followersFromFollowing[0].username}</b> {followersFromFollowing.length - 1 > 0 ? `and ${followersFromFollowing.length - 1} ${followersFromFollowing.length - 1 === 1 ? 'other' : 'others'}` : ``}</p>
                )}
              </div>
            </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Search