import { useState } from 'react'
import type User from '../types/User'
import useUserSearch from './mutation/user/useUserSearch'

const useSearch = (mutuals: boolean) => {
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ searchResults, setSearchResults ] = useState<User[] | []>([])
  const { mutate } = useUserSearch(setSearchResults)

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    mutate({ searchTerm, mutuals })
  }

  return { searchTerm, setSearchTerm, search, searchResults, setSearchResults }
}

export default useSearch